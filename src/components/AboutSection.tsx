import fotoWiterELucia from "@/imports/witer-e-lucia.png"
import fotoWiter2 from "@/imports/fotosobre.png"

export default function AboutSection() {
  return (
    <section id="sobre" className="about-campaign bg-gray-900 scroll-mt-16 lg:min-h-[760px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:min-h-[760px] lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-0 lg:min-h-[760px] lg:grid-cols-2">
          <div className="py-14 sm:py-20 lg:flex lg:flex-col lg:justify-center lg:py-10 lg:pr-12">
            <span
              className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quem é
            </span>
            <h2
              className="text-white font-black mb-6 sm:whitespace-nowrap"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.05rem, 5.5vw, 4.25rem)",
                lineHeight: 1.1,
              }}
            >
              PROF. WITER NAVES
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Professor, intelectual e líder político comprometido com a
                transformação social do Tocantins. Ao longo de décadas, dedicou
                sua vida à educação pública e à defesa dos direitos das pessoas
                tocantinenses.
              </p>
              <p>
                Com uma trajetória de luta pela democracia e pela justiça
                social, Prof. Winter Naves representa uma nova forma de fazer política:
                transparente, participativa e voltada para o bem-estar de todos.
              </p>
    
            </div>

            <blockquote className="mt-8 text-white text-lg leading-relaxed italic border-l-4 border-yellow-400 pl-6">
              "Gente cuidando de gente. Tocantins no rumo certo, com direitos,
              desenvolvimento e democracia."
            </blockquote>
            <cite
              className="block mt-3 text-yellow-400 font-bold not-italic text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              — PROF. WITER NAVES
            </cite>
          </div>

          <div className="relative flex items-end justify-center self-end overflow-hidden pt-4 lg:h-full lg:justify-end lg:pt-0">
            <div className="flex w-full max-w-[820px] items-end justify-center lg:h-full lg:justify-end">
              <div className="candidate-pair-crop w-[112%] max-w-none shrink-0 lg:hidden">
                <img
                  src={fotoWiterELucia}
                  alt="Prof. Winter Naves e Dra. Lucia Viana"
                  className="relative z-20 block h-auto w-full"
                />
              </div>
              <img
                src={fotoWiter2}
                alt="Prof. Winter Naves"
                className="about-desktop-portrait absolute right-0 top-0 z-20 hidden w-auto max-w-none object-contain object-top lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
