import { PRINCIPLES_DETAIL } from "../data"

interface PrinciplesSectionProps {
  onSelectPrinciple: (principle: typeof PRINCIPLES_DETAIL[number]) => void
}

export default function PrinciplesSection({
  onSelectPrinciple,
}: PrinciplesSectionProps) {
  return (
    <section
      id="principios"
      className="campaign-section campaign-section-deep py-14 sm:py-20 scroll-mt-16"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        </div>
      </div>
    </section>
  )
}
