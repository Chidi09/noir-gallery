<template>
  <div class="pt-24 px-8">
    <h1 class="font-headline text-5xl font-bold text-on-surface">Noir Gallery</h1>
    <p class="text-on-surface-variant mt-4">Test page is rendering</p>
    <div v-if="genres" class="mt-8">
      <p class="text-primary">Genres loaded: {{ genres.length }}</p>
    </div>
    <div v-else class="mt-8">
      <p class="text-secondary">Loading genres...</p>
    </div>
  </div>
</template>

<script setup>
const { data: genres } = useFetch('/api/genres', {
  server: true,
  default: () => []
})
</script>
