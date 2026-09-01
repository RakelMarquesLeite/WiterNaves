import { getStore } from "@netlify/blobs"
import { isAuthorized } from "./_auth.mjs"

const initialNews = [
  { id: "1", date: "05 AGO 2026", category: "Campanha", title: "Prof. Winter Naves lança plano de governo com foco nos direitos do povo tocantinense", summary: "Candidato apresenta documento com mais de 100 propostas para transformar o Tocantins em um estado mais justo e igualitário." },
  { id: "2", date: "02 AGO 2026", category: "Evento", title: "Grande ato público reúne apoiadores em Palmas", summary: "Manifestação marca o início oficial da campanha e reforça o compromisso com a democracia e a participação popular." },
  { id: "3", date: "28 JUL 2026", category: "Proposta", title: "Professor Witer defende investimento histórico na educação pública", summary: "Candidato anuncia prioridade máxima para a educação pública estadual como pilar do Tocantins de Toda Nossa Gente." },
]

const validNews = (items) => Array.isArray(items) && items.every((item) =>
  item && typeof item.id === "string" && typeof item.date === "string" &&
  typeof item.category === "string" && typeof item.title === "string" &&
  typeof item.summary === "string" && (item.url === undefined || typeof item.url === "string"),
)

export default async (request) => {
  const store = getStore({ name: "site-content", consistency: "strong" })
  if (request.method === "HEAD") {
    return new Response(null, { status: (await isAuthorized(request)) ? 204 : 401 })
  }
  if (request.method === "GET") {
    const news = await store.get("news", { type: "json" })
    return Response.json(news || initialNews, { headers: { "Cache-Control": "no-store" } })
  }
  if (request.method === "PUT") {
    if (!(await isAuthorized(request))) return Response.json({ error: "Sessão inválida ou expirada." }, { status: 401 })
    const news = await request.json().catch(() => null)
    if (!validNews(news)) return Response.json({ error: "Formato das notícias inválido." }, { status: 400 })
    await store.setJSON("news", news)
    return Response.json({ success: true, news })
  }
  return new Response(null, { status: 405 })
}

export const config = { path: "/api/news" }
