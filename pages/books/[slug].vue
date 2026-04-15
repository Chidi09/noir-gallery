<template>
  <div class="pt-24 px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Book Cover -->
        <div class="lg:col-span-4">
          <div class="aspect-[2/3] bg-surface-container-highest rounded-sm overflow-hidden shadow-xl sticky top-24">
            <img 
              :src="book?.coverImageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80'"
              :alt="book?.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Book Details -->
        <div class="lg:col-span-8 space-y-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span v-if="book?.genre" class="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest rounded-full">
                {{ book.genre.name }}
              </span>
              <span v-if="book?.seriesName" class="text-secondary text-sm font-bold uppercase">
                {{ book.seriesName }}
              </span>
            </div>
            
            <h1 class="font-headline text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-on-surface">
              {{ book?.title }}
            </h1>

            <NuxtLink 
              :to="`/authors/${book?.author?.slug}`"
              class="inline-flex items-center gap-3 mb-8 group"
            >
              <div class="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                <img 
                  v-if="book?.author?.avatarUrl"
                  :src="book.author.avatarUrl"
                  :alt="book.author.penName"
                  class="w-full h-full object-cover"
                />
                <span v-else class="material-symbols-outlined text-on-surface-variant flex items-center justify-center h-full">person</span>
              </div>
              <div>
                <p class="text-on-surface-variant text-xs uppercase tracking-widest">By</p>
                <p class="text-on-surface font-bold group-hover:text-primary transition-colors">{{ book?.author?.penName }}</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Synopsis -->
          <div class="bg-surface-container-high p-8 rounded-sm">
            <h2 class="font-headline text-xl font-bold uppercase mb-4 panel-accent pl-4 text-on-surface">Synopsis</h2>
            <p class="text-on-surface-variant text-lg leading-relaxed">{{ book?.synopsis || 'No synopsis available.' }}</p>
          </div>

          <!-- CTA -->
          <div v-if="book?.links?.[0]" class="flex flex-wrap gap-4">
            <a 
              :href="book.links[0].url"
              target="_blank"
              class="cinematic-gradient text-on-primary px-8 py-4 font-bold uppercase text-sm tracking-widest rounded-sm hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
            >
              View on Amazon
              <span class="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>

          <!-- More from Author -->
          <div v-if="moreBooks?.length" class="pt-8 border-t border-outline-variant/20">
            <h2 class="font-headline text-2xl font-bold uppercase mb-6 text-on-surface">More from {{ book?.author?.penName }}</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <BookCard v-for="b in moreBooks" :key="b.id" :book="b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: book } = await useFetch(`/api/books/${slug}`)

// Get more books from same author (excluding current)
const { data: moreBooks } = await useFetch(`/api/authors/${book.value?.author?.slug}`, {
  server: false,
  default: () => []
})
</script>
