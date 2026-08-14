import React from "react"
import logoPsol from "@/imports/logopsol (1).png"
import logoRede from "@/imports/logorede.png"
import { NAV_LINKS } from "../data"

interface NavbarProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeSection: string
  scrollTo: (href: string) => void
}

export default function Navbar({ menuOpen, setMenuOpen, activeSection, scrollTo }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 flex items-center justify-between h-16">
        <div className="flex items-center min-w-0">
          <img src={logoPsol} alt="PSOL" className="h-14 sm:h-16 w-auto object-contain shrink-0" />
          <img src={logoRede} alt="REDE Sustentabilidade" className="h-8 sm:h-9 w-auto object-contain -ml-1 shrink-0" />
          <span
            className="text-yellow-400 font-bold text-xs sm:text-sm hidden sm:block ml-3 whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
          >
            WITER NAVES
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                  activeSection === link.href.replace("#", "")
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden text-gray-300 hover:text-yellow-400 p-2 shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5" />
          <div className="w-6 h-0.5 bg-current mb-1.5" />
          <div className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-gray-950 border-t border-gray-800 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={`mob-${link.href}`}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-2.5 text-gray-300 hover:text-yellow-400 border-b border-gray-800 last:border-0"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
