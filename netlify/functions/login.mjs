import { createHash, timingSafeEqual } from "node:crypto"
import { createToken } from "./_auth.mjs"

const equal = (received, expected) => {
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}
const hash = (value) => createHash("sha256").update(value).digest("hex")

export default async (request) => {
  if (request.method !== "POST") return new Response(null, { status: 405 })
  try {
    const { username, password } = await request.json()
    const adminUser = process.env.ADMIN_USERNAME || "rakel"
    const passwordHash = process.env.ADMIN_PASSWORD
      ? hash(process.env.ADMIN_PASSWORD)
      : "93082ff9b55cff94ee7f4d728013baa1863409cf3e5873d3f639aa9238bdb4de"
    if (!equal(String(username), adminUser) || !equal(hash(String(password)), passwordHash)) {
      return Response.json({ error: "Usuário ou senha incorretos." }, { status: 401 })
    }
    return Response.json({ token: await createToken(adminUser) })
  } catch {
    return Response.json({ error: "Dados de login inválidos." }, { status: 400 })
  }
}

export const config = {
  path: "/api/admin/login",
  rateLimit: { windowSize: 60, windowLimit: 10, aggregateBy: ["domain", "ip"] },
}
