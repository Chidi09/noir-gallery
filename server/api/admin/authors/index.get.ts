import { requireAdmin } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const authors = await prisma.authorProfile.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  })

  return authors
})
