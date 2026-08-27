import React from "react"
import planoPdf from "@/imports/ITEM_7._PLANO_DE_GOVERNO_REDE_PSOL_MELHORADO.pdf"

interface PlanSectionProps { shareOrCopy: () => void }

export default function PlanSection({ shareOrCopy }: PlanSectionProps) {
  return (
<section
  id="plano"
  className="py-14 sm:py-20 relative overflow-hidden scroll-mt-16"
  style={{
    background:
      "linear-gradient(135deg, #250431 0%, #4c0b66 55%, #8f237d 100%)",
  }}
>
  <div
    className="absolute inset-0 opacity-10 pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(circle at center, rgba(245,200,0,0.3) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}
  />
  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffcf26] text-[#3d0754] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-[0_12px_35px_rgba(255,207,38,.2)]">
      📑
    </div>
    <h2
      className="text-white font-black mb-4"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        letterSpacing: "0.03em",
      }}
    >
      PLANO DE GOVERNO COMPLETO
    </h2>
    <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
      Acesse o documento completo com todas as propostas, programas e
      metas para transformar o Tocantins em um estado mais justo,
      sustentável e democrático.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={planoPdf}
        download="Plano-de-Governo-Witer-Naves.pdf"
        className="campaign-button-primary w-full sm:w-auto font-black px-6 sm:px-10 py-4 rounded-xl text-base sm:text-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "0.05em",
        }}
      >
        ↓ BAIXAR PLANO (PDF)
      </a>
      <button
        onClick={shareOrCopy}
        className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-black px-6 sm:px-10 py-4 rounded-xl text-base sm:text-lg transition-colors"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "0.05em",
        }}
      >
        ⬡ COMPARTILHAR
      </button>
    </div>
  </div>
</section>
  )
}
