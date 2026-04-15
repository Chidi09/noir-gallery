import { z } from 'zod'
import { prisma } from '~/server/utils/db'
import { hashPassword } from '~/server/utils/password'
import { createSession, setSessionCookie } from '~/server/utils/session'
import { generateSlug } from '~/server/utils/slug'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  penName: z.string().min(2).max(50),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = registerSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.errors,
    })
  }

  const { email, password, penName } = result.data

  // Check if email exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Email already registered',
    })
  }

  // Check if pen name exists
  const existingProfile = await prisma.authorProfile.findUnique({
    where: { penName },
  })

  if (existingProfile) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Pen name already taken',
    })
  }

  const slug = generateSlug(penName)

  // Create user with author profile
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(password),
      role: 'AUTHOR',
      authorProfile: {
        create: {
          slug,
          penName,
          status: 'PENDING',
        },
      },
    },
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
