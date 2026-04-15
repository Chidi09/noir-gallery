<template>
  <div class="pt-0">
    <!-- Hero Banner -->
    <section class="relative w-full h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img 
          v-if="author?.bannerUrl"
          :src="author.bannerUrl"
          :alt="author.penName"
          class="w-full h-full object-cover grayscale opacity-40"
        />
        <div v-else class="w-full h-full bg-gradient-to-b from-surface-container-high to-surface"></div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      
      <div class="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-end pb-12">
        <div class="flex flex-col md:flex-row items-end gap-8">
          <div class="relative">
            <div class="w-48 h-48 md:w-56 md:h-56 bg-surface-container-highest rounded-sm overflow-hidden border-4 border-surface shadow-2xl">
              <img 
                v-if="author?.avatarUrl"
                :src="author.avatarUrl"
                :alt="author.penName"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-surface-variant">
                <span class="material-symbols-outlined text-6xl text-on-surface-variant">person</span>
              </div>
            </div>
          </div>
          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-3">
              <span v-if="author?.isVerified" class="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase rounded-full">
                Verified
              </span>
              <span class="text-on-surface-variant text-sm font-label uppercase tracking-widest">
                {{ author?._count?.books || 0 }} Published Works
              </span>
            </div>
            <h1 class="text-5xl md:text-7xl font-headline font-bold text-on-surface uppercase tracking-tighter leading-none">
              {{ author?.penName }}
            </h1>
            <p class="max-w-xl text-on-surface-variant text-lg font-body leading-relaxed">
              {{ author?.bio || 'No bio provided.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Books Grid -->
    <section class="max-w-7xl mx-auto px-8 py-24">
      <div class="flex items-center justify-between mb-12">
        <div class="panel-accent pl-6">
          <h2 class="text-4xl font-headline font-bold uppercase tracking-tight text-on-surface">The Anthology</h2>
          <p class="text-secondary font-label uppercase tracking-widest text-sm mt-1">Selected Published Works</p>
        </div>
      </div>

      <div v-if="author?.books?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BookCard v-for="book in author.books" :key="book.id" :book="{ ...book, author }" />
      </div>
      <div v-else class="text-center py-16 bg-surface-container-high rounded-sm">
        <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">menu_book</span>
        <h3 class="font-headline text-xl font-bold uppercase mb-2 text-on-surface">No Published Works Yet</h3>
        <p class="text-on-surface-variant">This creator hasn't published any books yet.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: author } = await useFetch(`/api/authors/${slug}`)
</script>
