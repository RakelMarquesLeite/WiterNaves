import { INITIAL_NEWS, type NewsItem } from "./data"

export const NEWS_STORAGE_KEY = "witer-naves-news"
export const ADMIN_SESSION_KEY = "witer-naves-admin-session"

export function loadLocalNews(): NewsItem[] {
  try {
    const stored = localStorage.getItem(NEWS_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as NewsItem[]
  } catch {}
  return INITIAL_NEWS
}

export async function loadNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`/api/news?versao=${Date.now()}`, {
      cache: "no-store",
    })
    if (!response.ok) throw new Error("Não foi possível carregar bd.json")
    const news = (await response.json()) as unknown
    if (!Array.isArray(news)) throw new Error("Formato inválido em bd.json")
    return news as NewsItem[]
  } catch {
    return loadLocalNews()
  }
}

export function saveNews(news: NewsItem[]) {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
}

export async function loginAdmin(username: string, password: string) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || "Não foi possível entrar.")
  sessionStorage.setItem(ADMIN_SESSION_KEY, data.token)
}

export async function validateAdminSession() {
  const token = sessionStorage.getItem(ADMIN_SESSION_KEY)
  if (!token) return false
  const response = await fetch("/api/news", {
    method: "HEAD",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => null)
  if (!response?.ok) sessionStorage.removeItem(ADMIN_SESSION_KEY)
  return Boolean(response?.ok)
}

export async function publishNews(news: NewsItem[]) {
  const token = sessionStorage.getItem(ADMIN_SESSION_KEY)
  const response = await fetch("/api/news", {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
    body: JSON.stringify(news),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || "Não foi possível publicar.")
  saveNews(news)
}
