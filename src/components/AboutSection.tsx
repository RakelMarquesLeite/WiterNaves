import React from "react"
import fotoWiter2 from "@/imports/fotosobre.png"

export default function AboutSection() {
  return (
    <section id="sobre" className="about-campaign bg-gray-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
          <div className="py-14 sm:py-20 lg:pr-12">
            <span
              className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quem é
            </span>
            <h2
              className="text-white font-black mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              PROF. WITER
              <br />
              <span className="text-[#ff9b25]">NAVES</span>
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
              <p>
                Sua candidatura une o compromisso com os direitos fundamentais,
                o desenvolvimento sustentável e a construção de um Tocantins
                mais igualitário, onde cada pessoa possa viver com dignidade.
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
              — PROF. WINTER NAVES
            </cite>
          </div>

          <div className="relative flex items-end justify-center self-end overflow-hidden pt-4 lg:justify-end lg:pt-0">
            <img
              src={fotoWiter2}
              alt="Prof. Winter Naves"
              className="block h-auto w-full max-w-[560px] object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
