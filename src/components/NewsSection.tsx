import React from "react"
import type { NewsItem } from "../data"

interface NewsSectionProps { news: NewsItem[] }

export default function NewsSection({ news }: NewsSectionProps) {
  return (
<section id="noticias" className="bg-gray-900 py-14 sm:py-20 scroll-mt-16">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
      {news.map((n) => (
        <article
          key={n.id}
          className="bg-gray-950 border border-gray-800 hover:border-yellow-400/30 rounded-2xl overflow-hidden transition-colors group"
        >
          <div className="h-2 bg-gradient-to-r from-yellow-400 to-red-600" />
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
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
  )
}
