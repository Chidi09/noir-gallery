import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const author = await prisma.authorProfile.findUnique({
    where: {
      slug,
      status: 'APPROVED',
    },
    include: {
      books: {
        where: {
          status: 'PUBLISHED',
        },
        orderBy: {
          publishedAt: 'desc',
        },
        include: {
          genre: true,
          links: {
            where: {
              isPrimary: true,
            },
          },
        },
      },
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

  if (!author) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Author not found',
    })
  }

  return author
})
