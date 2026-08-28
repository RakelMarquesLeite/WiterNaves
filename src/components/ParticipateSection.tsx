import React from "react"
import instagramLogo from "@/imports/instagram-oficial.jpeg"
import youtubeLogo from "@/imports/youtube-oficial.webp"

interface ParticipateSectionProps {
  formSent: boolean
  formError: string
  formData: { nome: string email: string mensagem: string }
  setFormData: React.Dispatch<React.SetStateAction<{
    nome: string
    email: string
    mensagem: string
  }>>
  onSubmit: (e: React.FormEvent) => void
  resetForm: () => void
}

export default function ParticipateSection({
  formSent,
  formError,
  formData,
  setFormData,
  onSubmit,
  resetForm,
}: ParticipateSectionProps) {
  const messageWords = formData.mensagem
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const maxMessageWords = 180

  const updateMessage = (value: string) => {
    if (value.trim().split(/\s+/).filter(Boolean).length <= maxMessageWords) {
      setFormData((current) => ({ ...current, mensagem: value }))
    }
  }

  return (
    <section id="participe" className="campaign-section campaign-section-soft py-14 sm:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span
              className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3 block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Construa conosco
            </span>
            <h2
              className="text-white font-black mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              }}
            >
              PARTICIPE DA CONSTRUÇÃO DO NOSSO PLANO!
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Sua voz é fundamental para construirmos um Tocantins melhor para
              todos. Envie suas sugestões, ideias e propostas para a nossa
              equipe de campanha.
            </p>
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-6">
              <p
                className="text-yellow-400 font-bold text-lg mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                "Gente cuidando de gente."
              </p>
              <p className="text-gray-300 text-sm">
                Tocantins no rumo certo, com direitos, desenvolvimento e
                democracia.
              </p>
            </div>

            {/* Redes sociais */}
            <div className="mt-8">
              <p
                className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                SIGA NAS REDES
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/profwiternaves"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 overflow-hidden rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                >
                  <img src={instagramLogo} alt="" className="h-full w-full scale-110 object-cover" />
                </a>
                <a
                  href="https://www.youtube.com/@PSOL50oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 overflow-hidden rounded-full flex items-center justify-center bg-black transition-opacity hover:opacity-80"
                >
                  <img src={youtubeLogo} alt="" className="h-full w-full scale-[1.65] object-cover" />
                </a>
              </div>
            </div>
          </div>

          <div>
            {formSent ? (
              <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3
                  className="text-white font-bold text-xl mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Mensagem enviada!
                </h3>
                <p className="text-gray-400">
                  Obrigado pela sua participação. Nossa equipe entrará em
                  contato em breve.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 text-yellow-400 text-sm hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-[#3d0754]/90 border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-[0_20px_55px_rgba(20,0,28,.28)]"
              >
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={90}
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData((v) => ({ ...v, nome: e.target.value }))
                    }
                    className="w-full bg-[#250431] border border-white/15 focus:border-yellow-400 text-white rounded-lg px-4 py-3 outline-none transition-colors text-sm"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((v) => ({ ...v, email: e.target.value }))
                    }
                    className="w-full bg-[#250431] border border-white/15 focus:border-yellow-400 text-white rounded-lg px-4 py-3 outline-none transition-colors text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Sua mensagem ou sugestão
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={(e) => updateMessage(e.target.value)}
                    className="w-full bg-[#250431] border border-white/15 focus:border-yellow-400 text-white rounded-lg px-4 py-3 outline-none transition-colors text-sm resize-none"
                    placeholder="Escreva sua sugestão..."
                  />
                  <p className="mt-2 text-right text-xs text-gray-500">
                    {messageWords}/{maxMessageWords} palavras
                  </p>
                </div>
                {formError && (
                  <p className="text-red-400 text-sm">{formError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black py-3 rounded-lg transition-colors"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.05em",
                  }}
                >
                  PARTICIPE E ENVIE SUA SUGESTÃO
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
