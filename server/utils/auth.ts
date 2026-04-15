import { type H3Event } from 'h3'
import { validateSession, getSessionToken, deleteSessionCookie } from './session'

export async function getUserFromSession(event: H3Event) {
  const token = getSessionToken(event)
  if (!token) return null

  const user = await validateSession(token)
  return user
}

export async function requireAuth(event: H3Event) {
  const user = await getUserFromSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  return user
}

export async function requireAdmin(event: H3Event) {
  const user = await requireAuth(event)
  if (user.role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }
  return user
}

export async function logout(event: H3Event) {
  const token = getSessionToken(event)
  if (token) {
    const { deleteSession } = await import('./session')
    await deleteSession(token)
  }
  deleteSessionCookie(event)
}
