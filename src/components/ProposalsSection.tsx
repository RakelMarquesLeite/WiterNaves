import { PROPOSALS } from "../data"

export default function ProposalsSection() {
  return (
    <section id="propostas" className="campaign-section campaign-section-deep py-14 sm:py-20 scroll-mt-16">
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
        <div className="mobile-carousel -mx-4 px-4 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-6">
          {PROPOSALS.map((p) => (
            <div
              key={p.area}
              className="min-w-[84%] snap-center bg-[#3d0754]/90 border border-white/10 hover:border-yellow-400/50 rounded-2xl p-6 shadow-[0_16px_40px_rgba(20,0,28,.22)] transition-colors group sm:min-w-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full bg-yellow-400 shrink-0"
                  aria-hidden="true"
                />
                <h3
                  className="text-yellow-400 font-black"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {p.area.toUpperCase()}
                </h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
