import { z } from 'zod'
import { requireAdmin } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

const updateSchema = z.object({
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'REJECTED']),
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  
  const bookId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const result = updateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    })
  }

  const updateData = { status: result.data.status }
  
  if (result.data.status === 'PUBLISHED') {
    updateData.publishedAt = new Date()
  }

  const book = await prisma.book.update({
    where: { id: bookId },
    data: updateData,
  })

  return book
})
