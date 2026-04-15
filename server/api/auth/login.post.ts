import { z } from 'zod'
import { prisma } from '~/server/utils/db'
import { verifyPassword } from '~/server/utils/password'
import { createSession, setSessionCookie } from '~/server/utils/session'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    })
  }

  const { email, password } = result.data

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      authorProfile: {
        select: {
          id: true,
          penName: true,
          slug: true,
          status: true,
        },
      },
    },
  })

  if (!user || !user.passwordHash) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const isValid = await verifyPassword(password, user.passwordHash)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  const token = await createSession(user.id)
  setSessionCookie(event, token)

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      authorProfile: user.authorProfile,
    },
  }
})
