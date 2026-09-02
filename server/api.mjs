import { createHash, randomBytes, timingSafeEqual } from "node:crypto"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import http from "node:http"
import path from "node:path"

const host = "127.0.0.1"
const port = Number(process.env.API_PORT || 3001)
const dataDir = process.env.DATA_DIR || "/var/lib/witer-naves"
const newsFile = path.join(dataDir, "news.json")
const adminUser = process.env.ADMIN_USERNAME
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
const sessions = new Map()
const sessionDuration = 60 * 60 * 1000

if (!adminUser || !/^[a-f0-9]{64}$/i.test(adminPasswordHash || "")) {
  throw new Error("ADMIN_USERNAME e ADMIN_PASSWORD_HASH precisam estar configurados")
}

const hash = (value) => createHash("sha256").update(String(value)).digest()
const equal = (received, expected) => timingSafeEqual(hash(received), hash(expected))
const passwordMatches = (received) => timingSafeEqual(hash(received), Buffer.from(adminPasswordHash, "hex"))

function send(response, status, data, method = "GET") {
  const body = data === null ? "" : JSON.stringify(data)
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body),
    "X-Content-Type-Options": "nosniff",
  })
  response.end(method === "HEAD" ? "" : body)
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ""
    request.setEncoding("utf8")
    request.on("data", (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        request.destroy()
        reject(new Error("Payload muito grande"))
      }
    })
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"))
      } catch (error) {
        reject(error)
      }
    })
    request.on("error", reject)
  })
}

function isAuthorized(request) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "") || ""
  const expiresAt = sessions.get(token) || 0
  if (expiresAt <= Date.now()) sessions.delete(token)
  return expiresAt > Date.now()
}

function validNews(items) {
  return Array.isArray(items) && items.every((item) =>
    item && typeof item.id === "string" && typeof item.date === "string" &&
    typeof item.category === "string" && typeof item.title === "string" &&
    typeof item.summary === "string" &&
    (item.url === undefined || typeof item.url === "string"),
  )
}

async function loadNews() {
  try {
    return JSON.parse(await readFile(newsFile, "utf8"))
  } catch {
    return []
  }
}

async function saveNews(news) {
  await mkdir(dataDir, { recursive: true })
  const temporaryFile = `${newsFile}.${process.pid}.tmp`
  await writeFile(temporaryFile, `${JSON.stringify(news, null, 2)}\n`, "utf8")
  await rename(temporaryFile, newsFile)
}

const server = http.createServer(async (request, response) => {
  const route = new URL(request.url || "/", `http://${host}`).pathname

  try {
    if (route === "/api/admin/login" && request.method === "POST") {
      const body = await readBody(request)
      if (!equal(body.username || "", adminUser) || !passwordMatches(body.password || "")) {
        return send(response, 401, { error: "Usuário ou senha incorretos." })
      }
      const token = randomBytes(32).toString("base64url")
      sessions.set(token, Date.now() + sessionDuration)
      return send(response, 200, { token })
    }

    if (route === "/api/news" && request.method === "GET") {
      return send(response, 200, await loadNews())
    }

    if (route === "/api/news" && request.method === "HEAD") {
      return send(response, isAuthorized(request) ? 204 : 401, null, "HEAD")
    }

    if (route === "/api/news" && request.method === "PUT") {
      if (!isAuthorized(request)) {
        return send(response, 401, { error: "Sessão inválida ou expirada." })
      }
      const news = await readBody(request)
      if (!validNews(news)) {
        return send(response, 400, { error: "Formato das notícias inválido." })
      }
      await saveNews(news)
      return send(response, 200, { success: true, news })
    }

    return send(response, 404, { error: "Rota não encontrada." })
  } catch (error) {
    console.error(error)
    return send(response, 500, { error: "Erro interno do servidor." })
  }
})

server.listen(port, host, () => {
  console.log(`API ouvindo em http://${host}:${port}`)
})
