import { prisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const books = await prisma.book.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 24,
    include: {
      authorProfile: {
        select: {
          id: true,
          penName: true,
          slug: true,
        },
      },
      genre: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      links: {
        where: {
          isPrimary: true,
        },
      },
    },
  })

  // Transform to match BookCard interface
  return books.map(book => ({
    ...book,
    author: book.authorProfile,
  }))
})
