import { useEffect, useRef, useState } from "react"
import type { NewsItem } from "../data"

interface NewsSectionProps { news: NewsItem[] }

export default function NewsSection({ news }: NewsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const desktopCarousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeIndex >= news.length) setActiveIndex(0)
  }, [activeIndex, news.length])

  useEffect(() => {
    if (news.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % news.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [news.length])

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + news.length) % news.length)
  }

  const scrollDesktop = (direction: number) => {
    const carousel = desktopCarousel.current
    if (!carousel) return
    carousel.scrollBy({ left: direction * (carousel.clientWidth / 3), behavior: "smooth" })
  }

  return (
    <section id="noticias" className="campaign-section campaign-section-soft py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block" style={{ fontFamily: "var(--font-display)" }}>Acompanhe</span>
          <h2 className="text-white font-black" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.03em" }}>NOTÍCIAS DA CAMPANHA</h2>
        </div>

        {news.length > 0 ? (
          <div className="relative" aria-roledescription="carrossel" aria-label="Notícias da campanha">
            <div ref={desktopCarousel} className="overflow-hidden rounded-2xl lg:overflow-x-auto mobile-carousel">
              <div className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:transform-none!" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {news.map((item, index) => {
                  const article = (
                    <article className="min-h-[290px] lg:min-h-[330px] h-full bg-[#310440]/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(20,0,28,.22)] group">
                      <div className="h-2 bg-gradient-to-r from-yellow-400 via-[#ff9b25] to-[#a52a91]" />
                      <div className="p-6 lg:p-5">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="bg-yellow-400/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                          <span className="text-gray-400 text-xs">{item.date}</span>
                        </div>
                        <h3 className="text-white font-bold text-xl lg:text-base leading-snug mb-3 group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.summary}</p>
                        {item.url && <span className="inline-block mt-5 text-yellow-400 text-sm font-bold group-hover:underline">Ler notícia completa ↗</span>}
                      </div>
                    </article>
                  )
                  return (
                    <div className="w-full lg:w-1/3 shrink-0 lg:p-2" key={item.id} aria-hidden={index !== activeIndex && undefined}>
                      {item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{article}</a> : article}
                    </div>
                  )
                })}
              </div>
            </div>

            {news.length > 1 && (
              <>
                <button type="button" onClick={() => changeSlide(-1)} className="lg:hidden absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[#190220]/90 border border-white/20 text-white text-xl hover:bg-yellow-400 hover:text-[#190220] transition-colors" aria-label="Notícia anterior">‹</button>
                <button type="button" onClick={() => changeSlide(1)} className="lg:hidden absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[#190220]/90 border border-white/20 text-white text-xl hover:bg-yellow-400 hover:text-[#190220] transition-colors" aria-label="Próxima notícia">›</button>
                <div className="flex lg:hidden justify-center gap-2 mt-6">
                  {news.map((item, index) => (
                    <button key={item.id} type="button" onClick={() => setActiveIndex(index)} className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-yellow-400" : "w-2.5 bg-white/30 hover:bg-white/60"}`} aria-label={`Ir para notícia ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />
                  ))}
                </div>
              </>
            )}
            {news.length > 3 && (
              <>
                <button type="button" onClick={() => scrollDesktop(-1)} className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 size-11 items-center justify-center rounded-full bg-[#190220]/95 border border-white/20 text-white text-2xl shadow-lg hover:bg-yellow-400 hover:text-[#190220] transition-colors" aria-label="Voltar notícias">‹</button>
                <button type="button" onClick={() => scrollDesktop(1)} className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 size-11 items-center justify-center rounded-full bg-[#190220]/95 border border-white/20 text-white text-2xl shadow-lg hover:bg-yellow-400 hover:text-[#190220] transition-colors" aria-label="Avançar notícias">›</button>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-300">Nenhuma notícia publicada no momento.</p>
        )}
      </div>
    </section>
  )
}
