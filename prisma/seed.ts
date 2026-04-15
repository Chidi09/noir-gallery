import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const genres = [
    { name: 'Cyberpunk', slug: 'cyberpunk', description: 'High-tech, low-life futures' },
    { name: 'Grim Dark', slug: 'grim-dark', description: 'Brutal, dystopian worlds' },
    { name: 'Surrealism', slug: 'surrealism', description: 'Dreamlike, abstract narratives' },
    { name: 'Horror', slug: 'horror', description: 'Terror and suspense' },
    { name: 'Historical', slug: 'historical', description: 'Stories from the past' },
    { name: 'Psychological', slug: 'psychological', description: 'Mind-bending tales' },
    { name: 'Sci-Fi', slug: 'sci-fi', description: 'Science fiction adventures' },
    { name: 'Fantasy', slug: 'fantasy', description: 'Magical worlds and creatures' },
    { name: 'Superhero', slug: 'superhero', description: 'Heroes and villains' },
    { name: 'Comedy', slug: 'comedy', description: 'Humor and satire' },
  ]

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    })
  }

  console.log('✅ Genres seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
