import React from "react"
import logoPsol from "@/imports/logopsol (1).png"
import logoRede from "@/imports/logorede.png"
import fotoWiter from "@/imports/foto.png"
import fotoWiter2 from "@/imports/fotosobre.png"
import planoPdf from "@/imports/ITEM_7._PLANO_DE_GOVERNO_REDE_PSOL_MELHORADO.pdf"

interface HeroProps {
  scrollTo: (href: string) => void
}

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden pt-12 sm:pt-16"
      style={{
        background:
          "linear-gradient(135deg, #f5c800 0%, #f0a800 40%, #e07000 80%, #c05500 100%)",
      }}
    >
      {/* Decorative sun */}
      <div className="absolute right-[-7rem] top-20 sm:right-[-5rem] lg:right-8 lg:top-16 opacity-10 pointer-events-none select-none">
        <div className="w-72 h-52 sm:w-80 sm:h-60 lg:w-96 lg:h-96 rounded-full border-8 border-white/40" />
      </div>

      {/* Número 50 */}
      <div className="absolute right-5 top-24 sm:right-8 sm:top-24 lg:right-10 lg:top-24 pointer-events-none select-none z-10">
        <span
          className="text-red-600 font-black leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 15vw, 12rem)",
          }}
        >
          50
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center lg:items-end">
          {/* Coluna esquerda */}
          <div className="max-w-xl">
            {/* Logos + Federação */}
            <div className="mb-5 sm:mb-6">
              <p className="ml-8 sm:ml-16 lg:ml-24 text-gray-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 sm:mb-3">
                FEDERAÇÃO
              </p>

              <div className="flex items-center gap-2 sm:gap-4">
                <img
                  src={logoPsol}
                  alt="PSOL"
                  className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
                />

                <img
                  src={logoRede}
                  alt="REDE Sustentabilidade"
                  className="h-10 sm:h-11 lg:h-12 w-auto object-contain"
                />
              </div>
            </div>

            <h1
              className="font-black leading-none mb-1 text-gray-900"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 8vw, 5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              O TOCANTINS
            </h1>
            <h1
              className="font-black leading-none mb-6 text-red-700"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 8vw, 5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              DE TODA NOSSA GENTE
            </h1>

            <p className="text-gray-800 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Pelo{" "}
              <span className="text-red-700 font-semibold">
                Direito da Gente
              </span>
              , pelo{" "}
              <span className="text-blue-800 font-semibold">
                Bem-estar da Gente
              </span>{" "}
              e pelo{" "}
              <span className="text-purple-900 font-semibold">
                Bem-querer da Gente
              </span>
              .
            </p>

            <div className="flex bg-white/90 backdrop-blur rounded-xl overflow-hidden shadow-xl mb-6 sm:mb-8 w-full sm:w-auto">
              <img
                src={fotoWiter}
                alt="Prof. Witer Naves"
                className="lg:hidden w-20 shrink-0 object-cover object-top"
              />
              <div className="flex flex-1 flex-col sm:flex-row">
                <div className="px-4 sm:px-5 py-3 sm:py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Candidato a Governador
                  </p>
                  <p
                    className="font-black text-gray-900"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    PROF. WITER NAVES
                  </p>
                </div>
                <div className="px-4 sm:px-5 py-3 sm:py-4">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Candidata a Vice
                  </p>
                  <p
                    className="font-black text-red-700"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    LÚCIA VIANA
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#principios")}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-yellow-400 font-bold px-5 sm:px-6 py-3 rounded-lg transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.05em",
                }}
              >
                CONHEÇA AS PROPOSTAS →
              </button>
              <a
                href={planoPdf}
                download="Plano-de-Governo-Witer-Naves.pdf"
                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white font-bold px-5 sm:px-6 py-3 rounded-lg transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.05em",
                }}
              >
                BAIXAR PLANO (PDF)
              </a>
            </div>
          </div>

          {/* Foto candidato */}
          <div className="hidden lg:flex justify-end items-end lg:mr-0 xl:mr-4 mt-2 lg:mt-0">
            <img
              src={fotoWiter}
              alt="Prof. Witer Naves – Candidato a Governador do Tocantins"
              className="w-60 sm:w-80 lg:w-[30rem] xl:w-[34rem] max-h-[46svh] sm:max-h-[500px] lg:max-h-[620px] object-cover object-top"
              style={{ maxHeight: "620px", objectPosition: "center top" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
