import { z } from 'zod'
import { requireAuth } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'
import { generateSlug } from '~/server/utils/slug'

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  seriesName: z.string().max(200).optional().nullable(),
  volumeNumber: z.number().int().min(1).optional().nullable(),
  genreId: z.string().optional().nullable(),
  synopsis: z.string().max(5000).optional().nullable(),
  coverImageUrl: z.string().url().max(500).optional().nullable(),
  publicationDate: z.string().datetime().optional().nullable(),
})

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
  const existingBook = await prisma.book.findFirst({
    where: {
      id: bookId,
      authorProfileId: user.authorProfile.id,
    },
  })

  if (!existingBook) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Book not found',
    })
  }

  const body = await readBody(event)
  const result = updateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
      data: result.error.errors,
    })
  }

  const data = result.data

  // Generate new slug if title changed
  const updateData: any = { ...data }
  if (data.title && data.title !== existingBook.title) {
    updateData.slug = generateSlug(data.title)
  }

  if (data.publicationDate) {
    updateData.publicationDate = new Date(data.publicationDate)
  }

  const book = await prisma.book.update({
    where: { id: bookId },
    data: updateData,
  })

  return book
})
