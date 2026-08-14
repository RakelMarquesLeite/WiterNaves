import { INITIAL_NEWS, type NewsItem } from "./data"

// This is a client-side safeguard. For real production-grade protection,
// news publishing must be moved to an authenticated server endpoint.
export const ADMIN_PASSWORD_HASH =
  "8ecd47d54caab352cd0cdf63db1ff7925c411079c4b53557a42c6b6e3a20bb81"
export const NEWS_STORAGE_KEY = "witer-naves-news"
export const ADMIN_SESSION_KEY = "witer-naves-admin-session"

export function loadNews(): NewsItem[] {
  try {
    const stored = localStorage.getItem(NEWS_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as NewsItem[]
  } catch {}
  return INITIAL_NEWS
}

export function saveNews(news: NewsItem[]) {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
}
