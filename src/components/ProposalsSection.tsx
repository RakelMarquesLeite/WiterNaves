import React from "react"
import { PROPOSALS } from "../data"

export default function ProposalsSection() {
  return (
    <section id="propostas" className="bg-gray-950 py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Plano de Governo
          </span>
          <h2
            className="text-white font-black"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "0.03em",
            }}
          >
            NOSSAS PROPOSTAS
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROPOSALS.map((p) => (
            <div
              key={p.area}
              className="bg-gray-900 border border-gray-800 hover:border-yellow-400/40 rounded-2xl p-6 transition-colors group"
            >
              <div
                className="w-3 h-3 rounded-full bg-yellow-400 mb-5"
                aria-hidden="true"
              />
              <h3
                className="text-yellow-400 font-black mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                }}
              >
                {p.area.toUpperCase()}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
