import { requireAuth } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  if (!user.authorProfile) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Author profile not found',
    })
  }

  const books = await prisma.book.findMany({
    where: {
      authorProfileId: user.authorProfile.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      genre: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      links: {
        select: {
          id: true,
          provider: true,
          url: true,
          isPrimary: true,
        },
      },
    },
  })

  return books
})
