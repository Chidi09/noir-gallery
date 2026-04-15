import { type H3Event, getCookie, setCookie, deleteCookie } from 'h3'
import { randomBytes } from 'crypto'
import { prisma } from './db'

const SESSION_COOKIE = 'session_token'
const SESSION_DURATION_DAYS = 7

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS)

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return token
}

export async function validateSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        include: {
          authorProfile: true,
        },
      },
    },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token },
  })
}

export function getSessionToken(event: H3Event): string | undefined {
  return getCookie(event, SESSION_COOKIE)
}

export function setSessionCookie(event: H3Event, token: string) {
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * SESSION_DURATION_DAYS, // 7 days
    path: '/',
  })
}

export function deleteSessionCookie(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE)
}
