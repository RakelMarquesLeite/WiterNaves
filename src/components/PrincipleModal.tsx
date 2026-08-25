import { useEffect } from "react"
import { PRINCIPLES_DETAIL } from "../data"
import planoPdf from "@/imports/ITEM_7._PLANO_DE_GOVERNO_REDE_PSOL_MELHORADO.pdf"

export default function PrincipleModal({
  principle,
  onClose,
  onSuggest,
}: {
  principle: typeof PRINCIPLES_DETAIL[number]
  onClose: () => void
  onSuggest: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-3 sm:py-8 sm:px-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "#1a1a1a" }}
      >
        {/* Header colorido */}
        <div
          className="px-5 py-6 sm:px-8 sm:py-8 flex items-start gap-4 sm:gap-6"
          style={{ background: principle.color }}
        >
          <div
            className="w-3 h-3 mt-2 rounded-full bg-white shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2
              className="text-white font-black text-2xl sm:text-3xl leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {principle.title}
            </h2>
            <p className="text-white/80 text-lg italic">{principle.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0 text-xl font-bold"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Intro */}
        <div
          className="px-5 py-5 sm:px-8 sm:py-6"
          style={{
            background: principle.color + "18",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p className="text-gray-200 leading-relaxed text-base">
            {principle.intro}
          </p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            {principle.desc}
          </p>
        </div>

        {/* Áreas */}
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <h3
            className="text-white font-black text-lg mb-6 uppercase tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Políticas Públicas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principle.areas.map((a) => (
              <div
                key={a.title}
                className="rounded-xl p-5 flex gap-4"
                style={{
                  background: principle.color + "12",
                  border: `1px solid ${principle.color}30`,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                  style={{ background: principle.color }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="font-black text-white text-sm mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "#fff" }}
                  >
                    {a.title.toUpperCase()}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-5 pb-5 sm:px-8 sm:pb-8 flex flex-col sm:flex-row gap-3">
          <a
            href={planoPdf}
            download="Plano-de-Governo-Witer-Naves.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm tracking-wide transition-opacity hover:opacity-80"
            style={{
              background: "#D62828",
              color: "#fff",
              fontFamily: "var(--font-display)",
            }}
          >
            ↓ BAIXAR PLANO COMPLETO (PDF)
          </a>
          <button
            onClick={onSuggest}
            className="flex-1 py-3 rounded-xl font-black text-sm tracking-wide bg-yellow-400 text-gray-950 hover:bg-yellow-300 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SUGESTÃO
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-black text-sm tracking-wide border border-gray-600 text-gray-300 hover:border-gray-400 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  )
}
