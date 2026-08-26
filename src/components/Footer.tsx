import React from "react"

interface FooterProps {
  navLinks: { label: string; href: string }[]
  scrollTo: (href: string) => void
  handleCopyrightClick: () => void
}

export default function Footer({ navLinks, scrollTo, handleCopyrightClick }: FooterProps) {
  return (
<footer className="bg-gray-950 border-t border-gray-800 py-10 sm:py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <img src="/logo-witer.png" alt="50 — Prof. Witer" className="h-20 w-40 object-contain object-left" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Portal Oficial da Campanha do Prof. Witer Naves ao Governo do
          Tocantins 2026. PSOL + REDE Sustentabilidade.
        </p>
      </div>

      <div>
        <h4
          className="text-white font-bold mb-4 uppercase tracking-wider text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Siga Nossas Redes
        </h4>
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/profwiternaves"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg transition-opacity hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, #e1306c, #f77737)",
            }}
          >
            📷
          </a>
          <a
            href="https://www.youtube.com/@PSOL50oficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-11 h-11 rounded-full bg-red-700 flex items-center justify-center text-white text-lg transition-opacity hover:opacity-80"
          >
            ▶
          </a>
        </div>
      </div>

      <div>
        <h4
          className="text-white font-bold mb-4 uppercase tracking-wider text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Navegação
        </h4>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={`footer-${link.href}`}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <blockquote className="text-gray-400 text-sm italic">
        "Gente cuidando de gente. Tocantins no rumo certo, com direitos,
        desenvolvimento e democracia."
      </blockquote>
      {/* Clicar 5× no © abre o admin */}
      <p
        className="text-gray-600 text-xs cursor-default select-none"
        onClick={handleCopyrightClick}
        title=""
      >
        © 2026 Portal Oficial – Prof. Witer Naves. Todos os direitos reservados.
      </p>
    </div>
  </div>
</footer>
  )
}
