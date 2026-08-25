import React from "react"
import fotoWiter2 from "@/imports/fotosobre.png"

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-gray-900 py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          <div>
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
              <span className="text-yellow-400">NAVES</span>
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

          <div className="relative hidden lg:flex justify-end">
            <span
              className="absolute right-0 top-0 z-10 text-red-600 font-black leading-none select-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(6rem, 12vw, 10rem)" }}
              aria-label="Número 50"
            >
              50
            </span>
            <img
              src={fotoWiter2}
              alt="Prof. Winter Naves"
          className="w-64 sm:w-80 lg:w-[30rem] xl:w-[34rem] max-h-[54svh] sm:max-h-[540px] lg:max-h-[650px] object-cover"
              style={{ maxHeight: "650px", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
