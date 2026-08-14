import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { NAV_LINKS, PRINCIPLES_DETAIL } from "./data"
import { loadNews } from "./storage"
import PrincipleModal from "./components/PrincipleModal"
import AdminPanel from "./components/AdminPanel"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import PrinciplesSection from "./components/PrinciplesSection"
import AboutSection from "./components/AboutSection"
import ProposalsSection from "./components/ProposalsSection"
import PlanSection from "./components/PlanSection"
import NewsSection from "./components/NewsSection"
import ParticipateSection from "./components/ParticipateSection"
import Footer from "./components/Footer"

function shareOrCopy() {
  const url = window.location.href.split("#")[0]
  const data = { title: "Plano de Governo – Witer Naves", url }
  if (typeof navigator.share === "function") {
    navigator.share(data).catch(() => {})
  } else {
    navigator.clipboard?.writeText(url).then(() => {
      alert("Link copiado para a área de transferência!")
    }).catch(() => prompt("Copie o link:", url))
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [activePrinciple, setActivePrinciple] = useState<typeof PRINCIPLES_DETAIL[number] | null>(null)
  const [adminOpen, setAdminOpen] = useState(false)
  const [news, setNews] = useState(loadNews)
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" })
  const [formSent, setFormSent] = useState(false)
  const [formError, setFormError] = useState("")
  const footerClickCount = useRef(0)
  const footerClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onStorage = () => setNews(loadNews())
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  useEffect(() => {
    if (!adminOpen) setNews(loadNews())
  }, [adminOpen])

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...NAV_LINKS.map((l) => l.href.replace("#", ""))].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleCopyrightClick = () => {
    footerClickCount.current += 1
    if (footerClickTimer.current) clearTimeout(footerClickTimer.current)
    footerClickTimer.current = setTimeout(() => { footerClickCount.current = 0 }, 3000)
    if (footerClickCount.current >= 5) {
      footerClickCount.current = 0
      setAdminOpen(true)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError("")
    const CAMPANHA_EMAIL = "witwernavesofc@gmail.com"
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CAMPANHA_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          mensagem: formData.mensagem,
          _subject: `Nova sugestão de ${formData.nome} – Portal Witer Naves`,
          _replyto: formData.email,
          _template: "table",
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success !== false) setFormSent(true)
      else setFormError("Não foi possível enviar agora. Verifique sua conexão e tente novamente.")
    } catch {
      setFormError("Erro de conexão. Tente novamente.")
    }
  }

  const resetForm = () => {
    setFormSent(false)
    setFormError("")
    setFormData({ nome: "", email: "", mensagem: "" })
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>
      {activePrinciple && <PrincipleModal principle={activePrinciple} onClose={() => setActivePrinciple(null)} />}
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <PrinciplesSection onSelectPrinciple={setActivePrinciple} shareOrCopy={shareOrCopy} />
        <AboutSection />
        <ProposalsSection />
        <PlanSection shareOrCopy={shareOrCopy} />
        <NewsSection news={news} />
        <ParticipateSection formSent={formSent} formError={formError} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} resetForm={resetForm} />
      </main>
      <Footer navLinks={NAV_LINKS} scrollTo={scrollTo} handleCopyrightClick={handleCopyrightClick} />
    </div>
  )
}
