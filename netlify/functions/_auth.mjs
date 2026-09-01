import { randomBytes } from "node:crypto"
import { getStore } from "@netlify/blobs"

const TOKEN_DURATION = 60 * 60 * 1000

export async function createToken(username) {
  const token = randomBytes(32).toString("base64url")
  const sessions = getStore({ name: "admin-sessions", consistency: "strong" })
  await sessions.setJSON(token, { username, expiresAt: Date.now() + TOKEN_DURATION })
  return token
}

export async function isAuthorized(request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (!token) return false
  const sessions = getStore({ name: "admin-sessions", consistency: "strong" })
  const session = await sessions.get(token, { type: "json" })
  return Boolean(session && session.expiresAt > Date.now())
}
