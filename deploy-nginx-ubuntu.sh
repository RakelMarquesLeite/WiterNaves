#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="/var/www/witer-naves"
NGINX_SITE="/etc/nginx/sites-available/witer-naves"
API_ROOT="/opt/witer-naves"
DATA_ROOT="/var/lib/witer-naves"
ENV_FILE="/etc/witer-naves.env"

if ! command -v npm >/dev/null 2>&1; then
  echo "Erro: Node.js/npm não está instalado. Instale o Node.js 22 e tente novamente."
  exit 1
fi

echo "Instalando dependências do sistema (Nginx e Git LFS)..."
sudo apt-get update
sudo apt-get install -y nginx git-lfs

echo "Construindo o projeto em ${APP_DIR}..."
cd "$APP_DIR"

if [[ ! -f package.json ]]; then
  echo "Erro: package.json não encontrado em ${APP_DIR}."
  echo "Coloque este script na raiz do projeto (na mesma pasta do package.json) e execute novamente."
  exit 1
fi

if [[ -d .git ]]; then
  echo "Baixando imagens e demais arquivos armazenados no Git LFS..."
  git lfs install --local
  git lfs pull
else
  echo "Aviso: ${APP_DIR} não é um clone Git; não foi possível executar git lfs pull."
fi

if [[ -f package-lock.json || -f npm-shrinkwrap.json ]]; then
  npm ci
else
  echo "Aviso: nenhum package-lock.json encontrado; usando npm install."
  npm install
fi
npm run build

echo "Publicando os arquivos..."
sudo install -d -m 755 "$WEB_ROOT"
sudo find "$WEB_ROOT" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
sudo cp -a "$APP_DIR/dist/." "$WEB_ROOT/"
sudo chown -R root:root "$WEB_ROOT"
sudo find "$WEB_ROOT" -type d -exec chmod 755 {} +
sudo find "$WEB_ROOT" -type f -exec chmod 644 {} +

echo "Instalando a API de notícias e administração..."
sudo install -d -m 755 "$API_ROOT"
sudo install -m 644 "$APP_DIR/server/api.mjs" "$API_ROOT/api.mjs"
sudo install -d -o www-data -g www-data -m 750 "$DATA_ROOT"
if [[ ! -f "$DATA_ROOT/news.json" && -f "$APP_DIR/public/bd.json" ]]; then
  sudo install -o www-data -g www-data -m 640 "$APP_DIR/public/bd.json" "$DATA_ROOT/news.json"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  read -r -p "Usuário do painel administrativo: " ADMIN_USER_INPUT
  read -r -s -p "Senha forte do painel administrativo: " ADMIN_PASSWORD_INPUT
  echo
  if [[ ! "$ADMIN_USER_INPUT" =~ ^[a-zA-Z0-9._-]+$ || ${#ADMIN_PASSWORD_INPUT} -lt 12 ]]; then
    echo "Erro: use um usuário sem espaços e uma senha com pelo menos 12 caracteres."
    exit 1
  fi
  ADMIN_PASSWORD_HASH="$(printf '%s' "$ADMIN_PASSWORD_INPUT" | sha256sum | cut -d ' ' -f 1)"
  sudo install -m 600 /dev/null "$ENV_FILE"
  printf 'ADMIN_USERNAME=%s\nADMIN_PASSWORD_HASH=%s\nAPI_PORT=3001\nDATA_DIR=%s\n' \
    "$ADMIN_USER_INPUT" "$ADMIN_PASSWORD_HASH" "$DATA_ROOT" | sudo tee "$ENV_FILE" >/dev/null
fi

NODE_PATH="$(command -v node)"
sudo tee /etc/systemd/system/witer-naves-api.service >/dev/null <<SYSTEMD
[Unit]
Description=API do site Witer Naves
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
EnvironmentFile=$ENV_FILE
ExecStart=$NODE_PATH $API_ROOT/api.mjs
Restart=always
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$DATA_ROOT

[Install]
WantedBy=multi-user.target
SYSTEMD

echo "Configurando o Nginx..."
sudo tee "$NGINX_SITE" >/dev/null <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/witer-naves;
    index index.html;

    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 1m;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
NGINX

sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sfn "$NGINX_SITE" /etc/nginx/sites-enabled/witer-naves
sudo nginx -t
sudo systemctl daemon-reload
sudo systemctl enable --now witer-naves-api
sudo systemctl enable nginx
sudo systemctl restart nginx

echo
echo "Publicação concluída."
echo "Acesse: http://$(curl -fsS --max-time 3 https://checkip.amazonaws.com 2>/dev/null || echo 'IP-PUBLICO-DA-EC2')"
echo "Para atualizar depois, execute este script novamente."
