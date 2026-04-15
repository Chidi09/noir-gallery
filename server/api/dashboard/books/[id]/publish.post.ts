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

  // Verify book ownership
  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      authorProfileId: user.authorProfile.id,
    },
    include: {
      links: true,
    },
  })

  if (!book) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Book not found',
    })
  }

  // Validate required fields
  if (!book.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Book title is required',
    })
  }

  if (!book.synopsis) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Book synopsis is required',
    })
  }

  if (!book.coverImageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cover image is required',
    })
  }

  if (!book.genreId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Genre is required',
    })
  }

  if (!book.links.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one purchase link is required',
    })
  }

  // Update to published
  const publishedBook = await prisma.book.update({
    where: { id: bookId },
    data: {
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  })

  return publishedBook
})
