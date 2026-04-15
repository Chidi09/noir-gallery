import { prisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const genres = await prisma.genre.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })

  return genres
})
