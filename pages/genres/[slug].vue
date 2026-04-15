<template>
  <div class="pt-24 px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <h1 class="font-headline text-5xl font-bold uppercase tracking-tighter mb-4 text-on-surface">{{ genre?.name }}</h1>
        <p class="text-on-surface-variant max-w-xl">{{ genre?.description || `Discover ${genre?.name} comics from independent creators.` }}</p>
      </div>

      <div v-if="books?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
      <div v-else class="text-center py-16 bg-surface-container-high rounded-sm">
        <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">menu_book</span>
        <h3 class="font-headline text-xl font-bold uppercase mb-2 text-on-surface">No Books Yet</h3>
        <p class="text-on-surface-variant">No published books in this genre yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: genre } = await useFetch(`/api/genres/${slug}`)
const { data: books } = await useFetch(`/api/books?genre=${slug}`)
</script>
