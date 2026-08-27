import React from "react"
import type { NewsItem } from "../data"

interface NewsSectionProps { news: NewsItem[] }

export default function NewsSection({ news }: NewsSectionProps) {
  return (
<section id="noticias" className="campaign-section campaign-section-soft py-14 sm:py-20 scroll-mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <span
        className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Acompanhe
      </span>
      <h2
        className="text-white font-black"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          letterSpacing: "0.03em",
        }}
      >
        NOTÍCIAS DA CAMPANHA
      </h2>
    </div>
    <div className="mobile-carousel -mx-4 px-4 flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-8">
      {news.map((n) => {
        const content = (
        <article
          className="h-full bg-[#310440]/90 border border-white/10 hover:border-yellow-400/50 rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(20,0,28,.22)] transition-colors group"
        >
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-[#ff9b25] to-[#a52a91]" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-400/10 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {n.category}
              </span>
              <span className="text-gray-500 text-xs">{n.date}</span>
            </div>
            <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-yellow-400 transition-colors">
              {n.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {n.summary}
            </p>
            {n.url && (
              <span className="inline-block mt-5 text-yellow-400 text-sm font-bold group-hover:underline">
                Ler notícia completa ↗
              </span>
            )}
          </div>
        </article>
        )
        return n.url ? (
          <a className="min-w-[86%] snap-center sm:min-w-0" key={n.id} href={n.url} target="_blank" rel="noopener noreferrer" aria-label={`${n.title} (abre em nova aba)`}>
            {content}
          </a>
        ) : <div className="min-w-[86%] snap-center sm:min-w-0" key={n.id}>{content}</div>
      })}
    </div>
  </div>
</section>
  )
}
