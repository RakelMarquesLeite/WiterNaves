import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import fotoWiter from "@/imports/witer-candidato.jpeg"
import fotoLucia from "@/imports/lucia.jpeg"
import fotoAngelica from "@/imports/angelica.webp"
import fotoZaira from "@/imports/zaira.webp"
import fotoMaraba from "@/imports/maraba.webp"
import fotoClaudia from "@/imports/claudia.webp"
import fotoCleiton from "@/imports/cleiton21.png"

const CANDIDATES = [
  {
    name: "Prof. Witer Naves",
    role: "Candidato a governador",
    number: "50",
    image: fotoWiter,
    imagePosition: "center top",
    brief: "Professor e defensor de uma gestão pública democrática, próxima e comprometida com os direitos do povo tocantinense.",
    details: "Professor Witer Naves educador e liderança política do Tocantins, com uma trajetória de mais de 25 anos de atuação política no Partido dos Trabalhadores (PT). Ao longo desse período, construiu sua caminhada ligada à defesa da educação, dos direitos sociais, da juventude e da participação popular. Hoje, no PSOL e Rede Sustentabilidade, Professor Witer coloca sua experiência e sua história à disposição de um novo projeto político para o Tocantins. Candidato ao Governo do Estado em 2026, defende uma gestão mais próxima da população, com prioridade para educação, geração de emprego e renda, empreendedorismo, inclusão social e redução das desigualdades. Sua candidatura representa a busca por uma alternativa política construída a partir do diálogo com as comunidades e da valorização das pessoas que vivem e trabalham no Tocantins.",
  },
  {
    name: "Lúcia Viana",
    role: "Candidata a vice-governadora",
    number: "50",
    image: fotoLucia,
    imagePosition: "center 28%",
    brief: "Integra a chapa ao Governo do Tocantins, somando experiência, diálogo e compromisso com uma sociedade mais justa.",
    details: "Lúcia Viana compõe a candidatura da Federação PSOL REDE como vice-governadora. A chapa defende uma administração participativa, transparente e presente nos 139 municípios, com atenção especial às políticas sociais e à diversidade do Tocantins.",
  },
  // Dados abaixo são provisórios e podem ser substituídos quando as informações oficiais forem fornecidas.
  /*{
    name: "Fábio Ribeiro",
    role: "Candidata a senador",
    number: "180",
    image: fotoAngelica,
    imagePosition: "center 20%",
    brief: "Candidatura comprometida com participação popular, inclusão social e desenvolvimento sustentável.",
    details: "Informações provisórias. Angélica integra a candidatura coletiva da Federação PSOL REDE e defende uma atuação pública próxima das comunidades tocantinenses.",
  }*/
  {
    name: "Zaira",
    role: "Candidata a deputada federal",
    number: "1818",
    image: fotoZaira,
    imagePosition: "center 20%",
    brief: "Uma voz em defesa dos direitos sociais, da educação pública e da valorização das comunidades.",
    details: "Natural de Sampaio (TO), Zaira Silva é enfermeira formada pela FABIC. Sua trajetória passa por programas sociais, pela Rádio Natureza FM e pelo trabalho como cuidadora de idosos em Brasília, antes do retorno ao Tocantins. Candidata a deputada federal, defende saúde pública eficiente, dignidade para pessoas idosas, proteção e liberdade para as mulheres, cuidado com as crianças e apoio às famílias de crianças neurodivergentes.",
  },
  {
    name: "Marabá",
    role: "Candidato a deputado federal",
    number: "1800",
    image: fotoMaraba,
    imagePosition: "center 20%",
    brief: "Candidatura popular focada em trabalho, cidadania e políticas públicas acessíveis para todas as pessoas.",
    details: "Nascido em Grajaú (MA), Marabá construiu sua trajetória em Palmas e mantém atuação ligada à comunicação, ao entretenimento e à participação política. Com experiência em disputas eleitorais anteriores, chega a 2026 defendendo uma nova forma de fazer política, com maior proximidade com a população e valorização das comunidades. Como candidato da Federação *PSOL/REDE*, Marabá coloca seu nome à disposição para representar o Tocantins na Câmara dos Deputados, buscando ampliar a voz da população e contribuir para um Estado mais justo, participativo e sustentável. Marabá 1800 — uma voz do Tocantins em Brasília.*",
  },
  {
    name: "Cleiton Motorista",
    role: "Candidato a deputado federal",
    number: "5055",
    image: fotoCleiton,
    imagePosition: "center 18%",
    brief: "Servidor público municipal, universitário e militante ativo dos movimentos estudantis da UFNT.",
    details: "Cleiton Vieira da Silva é servidor público municipal no cargo de motorista, universitário e militante ativo nos movimentos estudantis da Universidade Federal do Norte do Tocantins (UFNT). Participou do Coletivo Juntos, coletivo interno do PSOL 50, e foi diretor de Esportes e Cultura do Centro Acadêmico de Ciências Sociais Florestan Fernandes. Foi um dos delegados do primeiro Fórum Estudantil da UFNT e membro discente dos Conselhos Superiores da universidade (CONSEPE e CONSUNI). Foi candidato a vereador pelo PSOL 50 em Tocantinópolis (TO), em 2023, e atualmente integra o Conselho Fiscal da Associação dos Servidores Públicos de Tocantinópolis (ASMAT). É candidato a deputado federal pelo PSOL 50 no Tocantins como Cleiton Motorista, número 5055.",
  },
  /*{
    name: "Cláudia",
    role: "Candidata a deputada federal",
    number: "1833",
    image: fotoClaudia,
    imagePosition: "center 20%",
    brief: "Compromisso com igualdade, sustentabilidade e uma representação política presente e participativa.",
    details: "Informações provisórias. Cláudia defende uma atuação democrática, transparente e conectada às necessidades da população tocantinense.",
  },*/
]

export default function CandidatesSection() {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<(typeof CANDIDATES)[number] | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const candidate = CANDIDATES[active]

  useEffect(() => {
    if (!selected) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [selected])

  const move = (direction: number) => {
    setSelected(null)
    setActive((current) => (current + direction + CANDIDATES.length) % CANDIDATES.length)
  }

  return (
    <section id="candidatos" className="campaign-section campaign-section-deep py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest">PSOL</span>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2" style={{ fontFamily: "var(--font-display)" }}>
            NOSSOS CANDIDATOS
          </h2>
          <p className="text-white/70 mt-3">Clique na foto ou na apresentação para conhecer cada candidatura.</p>
        </div>

        <div
          className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-7 touch-pan-y"
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return
            const distance = event.changedTouches[0].clientX - touchStart
            if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1)
            setTouchStart(null)
          }}
        >
          <button onClick={() => move(-1)} aria-label="Candidato anterior" className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 hover:border-yellow-400 items-center justify-center text-2xl text-white">‹</button>
          <button onClick={() => setSelected(selected === candidate ? null : candidate)} aria-expanded={selected === candidate} className="relative text-left grid md:grid-cols-[minmax(260px,420px)_1fr] overflow-hidden rounded-3xl bg-[#3d0754] border border-white/10 hover:border-yellow-400/60 shadow-[0_24px_70px_rgba(20,0,28,.35)] transition-colors group">
            <img src={candidate.image} alt={candidate.name} className="block w-full h-80 md:h-[430px] object-cover" style={{ objectPosition: candidate.imagePosition }} />
            <span className="p-7 sm:p-10 flex flex-col justify-center">
              <span className="text-[#ffb52b] font-bold uppercase tracking-widest text-sm">{candidate.role}</span>
              <span className="text-white font-black text-3xl sm:text-5xl mt-2 mb-5 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>{candidate.name}</span>
              <span className="text-gray-300 leading-relaxed">{candidate.brief}</span>
              <span className="text-yellow-400 font-bold mt-7">Saiba mais →</span>
            </span>
            <span className="absolute bottom-4 right-5 flex flex-col items-end text-yellow-400 drop-shadow-lg" aria-label={`Vote ${candidate.number}`}>
              <span className="mb-0.5 rounded-full bg-[#250431]/80 px-2 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white">Vote</span>
              <span className="font-black text-5xl sm:text-6xl leading-none" style={{ fontFamily: "var(--font-display)" }}>{candidate.number}</span>
            </span>
          </button>
          <button onClick={() => move(1)} aria-label="Próximo candidato" className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 hover:border-yellow-400 items-center justify-center text-2xl text-white">›</button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => move(-1)} aria-label="Candidato anterior" className="lg:hidden w-10 h-10 rounded-full border border-gray-700 text-white">‹</button>
          {CANDIDATES.map((item, index) => (
            <button key={item.name} onClick={() => { setSelected(null); setActive(index) }} aria-label={`Mostrar ${item.name}`} className={`h-2.5 rounded-full transition-all ${index === active ? "bg-yellow-400 w-8" : "bg-gray-600 w-2.5"}`} />
          ))}
          <button onClick={() => move(1)} aria-label="Próximo candidato" className="lg:hidden w-10 h-10 rounded-full border border-gray-700 text-white">›</button>
        </div>

      </div>

      {selected && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="candidate-dialog-title"
          onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}
        >
          <article className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl border border-yellow-400/20 bg-[#3d0754] shadow-2xl sm:max-h-[calc(100dvh-4rem)]">
            <button
              onClick={() => setSelected(null)}
              aria-label="Fechar detalhes"
              className="sticky top-4 z-10 ml-auto mr-4 mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#250431] text-2xl leading-none text-white shadow-lg hover:bg-yellow-400 hover:text-[#250431]"
            >
              ×
            </button>
            <div className="px-6 pb-7 pt-1 sm:px-10 sm:pb-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-[#ffb52b]">{selected.role}</span>
                  <h3 id="candidate-dialog-title" className="mt-2 text-3xl font-black text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</h3>
                </div>
                <p className="shrink-0 text-right text-4xl font-black text-yellow-400" style={{ fontFamily: "var(--font-display)" }}><span className="block text-[11px] uppercase tracking-[0.22em] text-white/80">Vote</span>{selected.number}</p>
              </div>
              <p className="mt-5 leading-relaxed text-gray-300">{selected.details}</p>
              <button onClick={() => setSelected(null)} className="mt-7 w-full rounded-xl bg-yellow-400 px-6 py-3 font-black text-gray-950 hover:bg-yellow-300 sm:w-auto">FECHAR</button>
            </div>
          </article>
        </div>,
        document.body,
      )}
    </section>
  )
}
