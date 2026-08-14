import React from "react"
import planoPdf from "@/imports/ITEM_7._PLANO_DE_GOVERNO_REDE_PSOL_MELHORADO.pdf"
import { PRINCIPLES_DETAIL } from "../data"

interface PrinciplesSectionProps {
  onSelectPrinciple: (principle: typeof PRINCIPLES_DETAIL[number]) => void
  shareOrCopy: () => void
}

export default function PrinciplesSection({
  onSelectPrinciple,
  shareOrCopy,
}: PrinciplesSectionProps) {
  return (
    <section
      id="principios"
      className="bg-gray-950 py-14 sm:py-20 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center text-white font-black mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            letterSpacing: "0.05em",
          }}
        >
          NOSSOS <span className="text-yellow-400">TRÊS</span> PRINCÍPIOS DE
          GOVERNANÇA
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRINCIPLES_DETAIL.map((p) => (
            <div
              key={p.id}
              className={`${p.bg} rounded-2xl p-6 flex flex-col gap-4 border border-white/10`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full bg-white shrink-0"
                  aria-hidden="true"
                />
                <h3
                  className="text-white font-black leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <div className="h-px bg-white/30" />
              <p className="text-white/85 text-sm leading-relaxed flex-1">
                {p.intro}
              </p>
              <button
                onClick={() => onSelectPrinciple(p)}
                className="mt-auto border border-white/60 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors w-full"
              >
                Acessar princípio →
              </button>
            </div>
          ))}

          {/* PDF Download Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 flex flex-col items-center gap-4">
            <div
              className="w-3 h-3 rounded-full bg-red-600"
              aria-hidden="true"
            />
            <h3
              className="text-white font-black text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                letterSpacing: "0.03em",
              }}
            >
              BAIXE O PLANO DE GOVERNO COMPLETO
            </h3>
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              Conheça todas as propostas, programas e ações para transformar o
              Tocantins.
            </p>
            <a
              href={planoPdf}
              download="Plano-de-Governo-Witer-Naves.pdf"
              className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              ↓ BAIXAR PLANO (PDF)
            </a>
            <button
              onClick={shareOrCopy}
              className="w-full border border-gray-600 hover:border-gray-400 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              ⬡ COMPARTILHAR
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
