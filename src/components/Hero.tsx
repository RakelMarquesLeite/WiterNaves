import fotoWiterELucia from "@/imports/witer-e-lucia.png"
import logoBranco from "@/imports/logo-branco.png"
import planoPdf from "@/imports/ITEM_7._PLANO_DE_GOVERNO_REDE_PSOL_MELHORADO.pdf"

const publicAsset = (file: string) => `${import.meta.env.BASE_URL}${file}`

interface HeroProps { scrollTo: (href: string) => void }

export default function Hero({ scrollTo }: HeroProps) {
  return (
    <section id="inicio" className="campaign-hero relative overflow-hidden pt-16 scroll-mt-16">
      <div className="campaign-glow campaign-glow-one" />
      <div className="campaign-glow campaign-glow-logo" />
      <div className="campaign-glow campaign-glow-two" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-end px-4 sm:px-6 lg:min-h-[max(600px,calc(100svh-4rem))] lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="z-20 pb-8 pt-8 sm:pb-10 lg:pb-10 lg:pt-8">
          <div className="mb-5 w-full max-w-[430px]">
            <img src={logoBranco} alt="50 — Governador Prof. Witer, vice Dra. Lucia Viana" className="relative z-10 w-full drop-shadow-[0_10px_24px_rgba(16,0,24,.2)]" />
          </div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-[#ff9b25]">Tocantins pode mais</p>
          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.94] text-white sm:text-5xl xl:text-[3.35rem]" style={{ fontFamily: "var(--font-display)" }}>
            O TOCANTINS DE TODA NOSSA GENTE
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">Pelo direito da Gente, pelo Bem-estar da Gente e pelo Bem-querer da Gente Tocantinense </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => scrollTo("#principios")} className="campaign-button-primary rounded-lg px-6 py-3 font-black tracking-wide transition-transform hover:-translate-y-0.5">CONHEÇA AS PROPOSTAS →</button>
            <a href={planoPdf} download="Plano-de-Governo-Witer-Naves.pdf" className="campaign-button-secondary rounded-lg px-6 py-3 text-center font-black tracking-wide transition-colors">BAIXAR PLANO (PDF)</a>
          </div>
        </div>
        <div className="relative hidden h-full min-h-[360px] items-end justify-center lg:flex lg:min-h-0 lg:justify-end">
          <div className="flex h-full w-full max-w-[980px] items-end justify-center lg:translate-x-16 lg:justify-end xl:translate-x-24">
            <div className="candidate-pair-crop hidden w-[106%] max-w-none shrink-0 lg:block xl:w-[110%]">
              <img src={fotoWiterELucia} alt="Prof. Witer Naves e Dra. Lucia Viana" className="relative z-20 block h-auto w-full" />
            </div>
          </div>
          <div className="absolute bottom-5 right-0 z-20 flex items-center gap-3 rounded-xl bg-[#4c0b66]/90 px-4 py-3 shadow-2xl backdrop-blur sm:bottom-8">
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Federação</span>
            <img src={publicAsset("logo-psol.png")} alt="PSOL" className="h-9 w-9 object-contain" />
            <img src={publicAsset("logo-rede.png")} alt="Rede" className="h-9 w-9 object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
