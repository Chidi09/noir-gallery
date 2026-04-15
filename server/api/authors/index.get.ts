import { prisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const authors = await prisma.authorProfile.findMany({
    where: {
      status: 'APPROVED',
    },
    orderBy: {
      penName: 'asc',
    },
    include: {
      _count: {
        select: {
          books: {
            where: {
              status: 'PUBLISHED',
            },
          },
        },
      },
    },
  })

  return authors
})
