<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="font-headline text-4xl font-bold uppercase tracking-tighter mb-8 text-on-surface">Book Moderation</h1>

    <div class="bg-surface-container-high rounded-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-surface-container-low">
          <tr>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Book</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Author</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Genre</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pendingBooks?.length" v-for="book in pendingBooks" :key="book.id" class="border-t border-outline-variant/10">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-14 bg-surface-container-low overflow-hidden">
                  <img v-if="book.coverImageUrl" :src="book.coverImageUrl" class="w-full h-full object-cover" />
                </div>
                <span class="font-bold text-on-surface">{{ book.title }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-on-surface-variant">{{ book.authorProfile?.penName }}</td>
            <td class="px-6 py-4 text-on-surface-variant">{{ book.genre?.name }}</td>
            <td class="px-6 py-4">
              <span class="px-3 py-1 text-xs font-bold uppercase rounded-full bg-secondary/20 text-secondary">
                {{ book.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button 
                  @click="approveBook(book.id)"
                  class="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase hover:bg-primary hover:text-on-primary transition-colors"
                >
                  Approve
                </button>
                <NuxtLink 
                  :to="`/books/${book.slug}`"
                  target="_blank"
                  class="px-3 py-1 border border-outline-variant/30 text-on-surface-variant text-xs font-bold uppercase hover:text-on-surface transition-colors"
                >
                  View
                </NuxtLink>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="5" class="px-6 py-8 text-center text-on-surface-variant">
              No books pending review
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: books, refresh } = await useFetch('/api/admin/books')

const pendingBooks = computed(() => books.value?.filter(b => b.status === 'REVIEW' || b.status === 'DRAFT'))

async function approveBook(id) {
  await $fetch(`/api/admin/books/${id}`, {
    method: 'PATCH',
    body: { status: 'PUBLISHED' }
  })
  await refresh()
}
</script>
