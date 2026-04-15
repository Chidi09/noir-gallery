import { prisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const genre = await prisma.genre.findUnique({
    where: {
      slug,
      isActive: true,
    },
  })

  if (!genre) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Genre not found',
    })
  }

  return genre
})
