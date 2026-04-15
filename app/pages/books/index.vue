<template>
  <div class="pt-24 px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <h1 class="font-headline text-5xl font-bold uppercase tracking-tighter mb-4 text-on-surface">Collections</h1>
        <p class="text-on-surface-variant max-w-xl">Browse our curated catalog of independent comic releases.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <BookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: books } = await useFetch('/api/books')
</script>
