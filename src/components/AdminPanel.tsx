import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import type { NewsItem } from "../data"
import {
  ADMIN_SESSION_KEY,
  loadLocalNews,
  loadNews,
  loginAdmin,
  publishNews,
  validateAdminSession,
} from "../storage"

const WORD_LIMITS = { title: 18, summary: 55 }

const wordCount = (value: string) =>
  value.trim().split(/\s+/).filter(Boolean).length
const isValidSession = () => {
  const token = sessionStorage.getItem(ADMIN_SESSION_KEY)
  const valid = Boolean(token && /^[A-Za-z0-9_-]{43}$/.test(token))
  if (!valid) sessionStorage.removeItem(ADMIN_SESSION_KEY)
  return valid
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState("rakel")
  const [pw, setPw] = useState("")
  const [pwError, setPwError] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [news, setNews] = useState<NewsItem[]>(loadLocalNews)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [form, setForm] = useState({
    date: "",
    category: "",
    title: "",
    summary: "",
    url: "",
  })
  const [saved, setSaved] = useState(false)
  const [publishError, setPublishError] = useState("")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    loadNews().then(setNews)
    if (isValidSession()) validateAdminSession().then(setAuthed)
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    try {
      await loginAdmin(username, pw)
      setAuthed(true)
      setPwError(false)
      setLoginMessage("")
      setPw("")
    } catch (error) {
      setLoginMessage(error instanceof Error ? error.message : "Não foi possível entrar.")
      setPwError(true)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const startEdit = (n: NewsItem) => {
    setEditing(n)
    setForm({
      date: n.date,
      category: n.category,
      title: n.title,
      summary: n.summary,
      url: n.url ?? "",
    })
  }

  const startNew = () => {
    setEditing({
      id: Date.now().toString(),
      date: "",
      category: "",
      title: "",
      summary: "",
      url: "",
    })
    setForm({ date: "", category: "", title: "", summary: "", url: "" })
  }

  const saveItem = async () => {
    if (!editing) return
    if (
      !form.date.trim() ||
      !form.category.trim() ||
      !form.title.trim() ||
      !form.summary.trim()
    )
      return
    if (
      wordCount(form.title) > WORD_LIMITS.title ||
      wordCount(form.summary) > WORD_LIMITS.summary
    )
      return
    if (form.url.trim()) {
      try {
        const parsed = new URL(form.url)
        if (!["http:", "https:"].includes(parsed.protocol)) return
      } catch {
        return
      }
    }
    const updated = news.some((n) => n.id === editing.id)
      ? news.map((n) => (n.id === editing.id ? { ...editing, ...form } : n))
      : [{ ...editing, ...form }, ...news]
    try {
      setPublishError("")
      await publishNews(updated)
      setNews(updated)
      setEditing(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "Não foi possível publicar.")
      if ((error as Error).message.includes("Sessão")) setAuthed(false)
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm("Excluir esta notícia?")) return
    const updated = news.filter((n) => n.id !== id)
    try {
      setPublishError("")
      await publishNews(updated)
      setNews(updated)
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "Não foi possível excluir.")
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-3 sm:py-8 sm:px-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ background: "#111" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span
              className="text-white font-black text-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ADMIN — NOTÍCIAS
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Login */}
        {!authed ? (
          <form onSubmit={handleLogin} className="p-6 sm:p-8 max-w-sm mx-auto">
            <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed">
              Acesso restrito à administração do site.
            </p>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Usuário
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none mb-4 bg-[#1c1c1c] border border-white/10"
            />
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none mb-2"
              style={{
                background: "#1c1c1c",
                border: `1px solid ${
                  pwError ? "#D62828" : "rgba(255,255,255,0.1)"
                }`,
              }}
              autoFocus
            />
            {pwError && loginMessage && (
              <p className="text-red-400 text-xs mb-3" role="alert">
                {loginMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl font-black text-sm mt-2 disabled:opacity-60"
              style={{
                background: "#f5c800",
                color: "#171717",
                fontFamily: "var(--font-display)",
              }}
            >
              {isLoggingIn ? "VERIFICANDO..." : "ENTRAR"}
            </button>
          </form>
        ) : (
          <div className="p-4 sm:p-6">
            {saved && (
              <div
                className="mb-4 rounded-xl px-4 py-3 text-sm font-semibold text-green-400"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                ✓ Salvo com sucesso!
              </div>
            )}
            {publishError && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm font-semibold text-red-400 bg-red-400/10 border border-red-400/20" role="alert">
                {publishError}
              </div>
            )}

            {/* Formulário edição */}
            {editing && (
              <div
                className="rounded-2xl p-4 sm:p-6 mb-6"
                style={{
                  background: "#1c1c1c",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  className="text-white font-black text-sm mb-4 uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {news.some((n) => n.id === editing.id)
                    ? "Editar Notícia"
                    : "Nova Notícia"}
                </h3>
                <div className="mb-5 rounded-xl bg-yellow-400/10 border border-yellow-400/20 px-4 py-3">
                  <p className="text-yellow-300 text-xs font-bold mb-1">Como publicar</p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Preencha todos os campos marcados com <span className="text-red-400 font-bold">*</span>. O link é opcional. Ao clicar em publicar, a notícia ficará disponível no site.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Data da publicação <span className="text-red-400">*</span>
                    </label>
                    <input
                      maxLength={40}
                      value={form.date}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, date: e.target.value }))
                      }
                      placeholder="01 AGO 2026"
                      required
                      className="w-full rounded-lg px-3 py-2 text-white text-sm outline-none"
                      style={{
                        background: "#111",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    <p className="text-gray-600 text-[11px] mt-1">Exemplo: 01 AGO 2026</p>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs mb-1">
                      Categoria <span className="text-red-400">*</span>
                    </label>
                    <input
                      maxLength={24}
                      value={form.category}
                      onChange={(e) =>
                        setForm((v) => ({ ...v, category: e.target.value }))
                      }
                      placeholder="Campanha"
                      required
                      className="w-full rounded-lg px-3 py-2 text-white text-sm outline-none"
                      style={{
                        background: "#111",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    <p className="text-gray-600 text-[11px] mt-1">Ex.: Campanha, Evento ou Proposta</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="flex justify-between gap-3 text-gray-500 text-xs mb-1">
                    <span>Título da notícia <span className="text-red-400">*</span></span>
                    <span>
                      {wordCount(form.title)}/{WORD_LIMITS.title} palavras
                    </span>
                  </label>
                  <input
                    maxLength={140}
                    value={form.title}
                    onChange={(e) => {
                      if (wordCount(e.target.value) <= WORD_LIMITS.title) {
                        setForm((v) => ({ ...v, title: e.target.value }))
                      }
                    }}
                    placeholder="Título da notícia"
                    required
                    className="w-full rounded-lg px-3 py-2 text-white text-sm outline-none"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <p className="text-gray-600 text-[11px] mt-1">Escreva uma chamada direta, com no máximo {WORD_LIMITS.title} palavras.</p>
                </div>
                <div className="mb-4">
                  <label className="flex justify-between gap-3 text-gray-500 text-xs mb-1">
                    <span>Resumo <span className="text-red-400">*</span></span>
                    <span>
                      {wordCount(form.summary)}/{WORD_LIMITS.summary} palavras
                    </span>
                  </label>
                  <textarea
                    maxLength={420}
                    value={form.summary}
                    onChange={(e) => {
                      if (wordCount(e.target.value) <= WORD_LIMITS.summary) {
                        setForm((v) => ({ ...v, summary: e.target.value }))
                      }
                    }}
                    rows={3}
                    placeholder="Resumo da notícia…"
                    required
                    className="w-full rounded-lg px-3 py-2 text-white text-sm outline-none resize-none"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <p className="text-gray-600 text-[11px] mt-1">Explique o fato principal em até {WORD_LIMITS.summary} palavras.</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-500 text-xs mb-1">
                    Link da notícia externa (opcional)
                  </label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, url: e.target.value }))
                    }
                    placeholder="https://exemplo.com/noticia"
                    className="w-full rounded-lg px-3 py-2 text-white text-sm outline-none"
                    style={{
                      background: "#111",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                  <p className="text-gray-600 text-[11px] mt-1">Use somente se a notícia completa estiver em outra página. Deve começar com https://</p>
                </div>
                {(!form.date.trim() || !form.category.trim() || !form.title.trim() || !form.summary.trim()) && (
                  <p className="text-amber-300 text-xs mb-3" role="status">
                    Preencha os campos obrigatórios para habilitar a publicação.
                  </p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={saveItem}
                    disabled={
                      !form.date.trim() ||
                      !form.category.trim() ||
                      !form.title.trim() ||
                      !form.summary.trim() ||
                      wordCount(form.title) > WORD_LIMITS.title ||
                      wordCount(form.summary) > WORD_LIMITS.summary
                    }
                    className="px-5 py-2 rounded-lg font-black text-xs disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      background: "#f5c800",
                      color: "#171717",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    PUBLICAR NOTÍCIA
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="px-5 py-2 rounded-lg font-bold text-xs text-gray-400 border border-gray-700"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            )}

            {/* Botão nova notícia */}
            {!editing && (
              <div className="mb-5">
                <button
                  onClick={startNew}
                  className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(245,196,0,0.1)",
                    border: "1px dashed rgba(245,196,0,0.3)",
                    color: "#f5c800",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  + NOVA NOTÍCIA
                </button>
              </div>
            )}

            {/* Lista */}
            <div className="space-y-3">
              {news.map((n) => (
                <div
                  key={n.id}
                  className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                  style={{
                    background: "#1c1c1c",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(245,196,0,0.1)",
                          color: "#f5c800",
                        }}
                      >
                        {n.category}
                      </span>
                      <span className="text-gray-600 text-xs">{n.date}</span>
                    </div>
                    <p className="text-white text-sm font-semibold leading-snug truncate">
                      {n.title}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={() => startEdit(n)}
                      className="text-xs px-3 py-1.5 rounded-lg font-bold text-blue-400 border border-blue-400/30 hover:bg-blue-400/10"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteItem(n.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-bold text-red-400 border border-red-400/30 hover:bg-red-400/10"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
