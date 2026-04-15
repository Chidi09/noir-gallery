<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter text-on-surface">My Books</h1>
      <NuxtLink 
        to="/dashboard/books/new"
        class="cinematic-gradient text-on-primary px-6 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all"
      >
        Add New Book
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="book in books" :key="book.id" class="bg-surface-container-high rounded-sm overflow-hidden">
        <div class="aspect-[2/3] bg-surface-container-low">
          <img 
            :src="book.coverImageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'"
            :alt="book.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span 
              class="text-xs font-bold uppercase px-2 py-1 rounded-full"
              :class="statusClasses[book.status]"
            >
              {{ book.status }}
            </span>
          </div>
          <h3 class="font-headline text-lg font-bold uppercase mb-1 text-on-surface">{{ book.title || 'Untitled' }}</h3>
          <p v-if="book.seriesName" class="text-secondary text-xs uppercase mb-4">{{ book.seriesName }}</p>
          <div class="flex gap-2 mt-4">
            <NuxtLink 
              :to="`/dashboard/books/${book.id}/edit`"
              class="flex-1 text-center border border-outline-variant/30 text-on-surface py-2 text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-all"
            >
              Edit
            </NuxtLink>
            <button 
              v-if="book.status === 'DRAFT'"
              @click="publish(book.id)"
              :disabled="publishing === book.id"
              class="flex-1 text-center bg-primary/20 text-primary border border-primary/40 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all disabled:opacity-50"
            >
              {{ publishing === book.id ? 'Publishing...' : 'Publish' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true
})

const { data: books, refresh } = await useFetch('/api/dashboard/books')
const publishing = ref(null)

const statusClasses = {
  'DRAFT': 'bg-surface-variant text-on-surface-variant',
  'REVIEW': 'bg-secondary/20 text-secondary',
  'PUBLISHED': 'bg-primary/20 text-primary',
  'REJECTED': 'bg-error/20 text-error'
}

async function publish(bookId) {
  publishing.value = bookId
  try {
    await $fetch(`/api/dashboard/books/${bookId}/publish`, {
      method: 'POST'
    })
    await refresh()
  } catch (e) {
    console.error('Failed to publish:', e)
  } finally {
    publishing.value = null
  }
}
</script>
