import { z } from 'zod'
import { requireAuth } from '~/server/utils/auth'
import { prisma } from '~/server/utils/db'
import { generateSlug } from '~/server/utils/slug'

const createSchema = z.object({
  amazonUrl: z.string().url(),
})

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)

  if (!user.authorProfile) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Author profile not found',
    })
  }

  const body = await readBody(event)
  const result = createSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    })
  }

  const { amazonUrl } = result.data

  // Validate it's an Amazon URL
  const amazonRegex = /^https?:\/\/(www\.)?(amazon\.com|amzn\.to)/i
  if (!amazonRegex.test(amazonUrl)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Amazon URL',
    })
  }

  // Generate a temporary title from the URL
  const tempSlug = generateSlug(`book-${Date.now()}`)

  // Create book with link
  const book = await prisma.book.create({
    data: {
      authorProfileId: user.authorProfile.id,
      slug: tempSlug,
      title: '',
      status: 'DRAFT',
      links: {
        create: {
          provider: 'amazon',
          url: amazonUrl,
          isPrimary: true,
        },
      },
    },
  })

  return book
})
