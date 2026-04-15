import { z } from 'zod'
import { requireAdmin } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'

const updateSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'SUSPENDED']),
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  
  const authorId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const result = updateSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    })
  }

  const author = await prisma.authorProfile.update({
    where: { id: authorId },
    data: { status: result.data.status },
  })

  return author
})
