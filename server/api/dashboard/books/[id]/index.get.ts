import { requireAuth } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const bookId = getRouterParam(event, 'id')

  if (!user.authorProfile) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Author profile not found',
    })
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      authorProfileId: user.authorProfile.id,
    },
    include: {
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

  return book
})
