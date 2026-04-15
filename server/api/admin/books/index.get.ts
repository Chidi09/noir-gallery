import { requireAdmin } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      authorProfile: {
        select: {
          penName: true,
          slug: true,
        },
      },
      genre: {
        select: {
          name: true,
        },
      },
    },
  })

  return books
})
