import { useEffect, useState } from "react"
import fotoWiter from "@/imports/foto.png"
import chapa from "@/imports/image.png"

const CANDIDATES = [
  {
    name: "Prof. Winter Naves",
    role: "Candidato a governador",
    image: fotoWiter,
    imagePosition: "center top",
    brief: "Professor e defensor de uma gestão pública democrática, próxima e comprometida com os direitos do povo tocantinense.",
    details: "Prof. Winter Naves encabeça a candidatura ao Governo do Tocantins pela Federação PSOL REDE. Sua proposta está organizada em três princípios: o Direito da Gente, o Bem-estar da Gente e o Bem-querer da Gente, reunindo participação popular, desenvolvimento sustentável e garantia de direitos.",
  },
  {
    name: "Lúcia Viana",
    role: "Candidata a vice-governadora",
    image: chapa,
    imagePosition: "78% center",
    brief: "Integra a chapa ao Governo do Tocantins, somando experiência, diálogo e compromisso com uma sociedade mais justa.",
    details: "Lúcia Viana compõe a candidatura da Federação PSOL REDE como vice-governadora. A chapa defende uma administração participativa, transparente e presente nos 139 municípios, com atenção especial às políticas sociais e à diversidade do Tocantins.",
  },
]

export default function CandidatesSection() {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<(typeof CANDIDATES)[number] | null>(null)
  const candidate = CANDIDATES[active]

  useEffect(() => {
    if (!selected) return
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  const move = (direction: number) =>
    setActive((current) => (current + direction + CANDIDATES.length) % CANDIDATES.length)

  return (
    <section id="candidatos" className="bg-gray-950 py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest">PSOL 50</span>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2" style={{ fontFamily: "var(--font-display)" }}>
            NOSSOS CANDIDATOS
          </h2>
          <p className="text-gray-400 mt-3">Clique na foto ou na apresentação para conhecer cada candidatura.</p>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-7">
          <button onClick={() => move(-1)} aria-label="Candidato anterior" className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 hover:border-yellow-400 items-center justify-center text-2xl text-white">‹</button>
          <button onClick={() => setSelected(candidate)} className="text-left grid md:grid-cols-[minmax(260px,420px)_1fr] overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-yellow-400/60 transition-colors group">
            <img src={candidate.image} alt={candidate.name} className="w-full h-80 md:h-[430px] object-cover" style={{ objectPosition: candidate.imagePosition }} />
            <span className="p-7 sm:p-10 flex flex-col justify-center">
              <span className="text-red-500 font-bold uppercase tracking-widest text-sm">{candidate.role}</span>
              <span className="text-white font-black text-3xl sm:text-5xl mt-2 mb-5 group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>{candidate.name}</span>
              <span className="text-gray-300 leading-relaxed">{candidate.brief}</span>
              <span className="text-yellow-400 font-bold mt-7">Ver detalhes →</span>
            </span>
          </button>
          <button onClick={() => move(1)} aria-label="Próximo candidato" className="hidden lg:flex w-12 h-12 rounded-full border border-gray-700 hover:border-yellow-400 items-center justify-center text-2xl text-white">›</button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => move(-1)} aria-label="Candidato anterior" className="lg:hidden w-10 h-10 rounded-full border border-gray-700 text-white">‹</button>
          {CANDIDATES.map((item, index) => (
            <button key={item.name} onClick={() => setActive(index)} aria-label={`Mostrar ${item.name}`} className={`h-2.5 rounded-full transition-all ${index === active ? "bg-yellow-400 w-8" : "bg-gray-600 w-2.5"}`} />
          ))}
          <button onClick={() => move(1)} aria-label="Próximo candidato" className="lg:hidden w-10 h-10 rounded-full border border-gray-700 text-white">›</button>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm p-4 flex items-center justify-center" onClick={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="relative max-w-2xl w-full rounded-3xl bg-gray-900 border border-gray-700 p-7 sm:p-10 shadow-2xl">
            <button onClick={() => setSelected(null)} aria-label="Fechar detalhes" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800 text-white text-xl">×</button>
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">{selected.role}</span>
            <h3 className="text-white font-black text-3xl sm:text-4xl mt-2 mb-5 pr-10" style={{ fontFamily: "var(--font-display)" }}>{selected.name}</h3>
            <p className="text-gray-300 leading-relaxed">{selected.details}</p>
            <button onClick={() => setSelected(null)} className="mt-7 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black px-6 py-3 rounded-xl">FECHAR</button>
          </article>
        </div>
      )}
    </section>
  )
}
