import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const book = await prisma.book.findUnique({
    where: {
      slug,
      status: 'PUBLISHED',
    },
    include: {
      authorProfile: {
        select: {
          id: true,
          penName: true,
          slug: true,
          avatarUrl: true,
        },
      },
      genre: true,
      links: true,
    },
  })

  if (!book) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Book not found',
    })
  }

  return {
    ...book,
    author: book.authorProfile,
  }
})
