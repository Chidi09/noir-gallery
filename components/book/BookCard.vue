<template>
  <div class="flex flex-col group">
    <div class="relative aspect-[2/3] bg-surface-container-highest mb-6 overflow-hidden shadow-xl transition-all duration-300 ease-cinematic group-hover:-translate-y-2">
      <img 
        :src="book.coverImageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'" 
        :alt="book.title"
        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div v-if="isNew" class="absolute top-4 right-4 bg-primary text-on-primary font-bold text-[10px] uppercase px-2 py-1 tracking-tighter">
        New
      </div>
    </div>
    <h3 class="font-headline text-xl font-bold uppercase mb-1 tracking-tight text-on-surface">{{ book.title }}</h3>
    <p class="text-on-surface-variant text-xs font-bold uppercase mb-4">
      By {{ book.author?.penName || 'Unknown' }}
    </p>
    <a 
      v-if="book.links?.[0]"
      :href="book.links[0].url" 
      target="_blank"
      class="mt-auto flex items-center justify-between bg-surface-variant/50 hover:bg-surface-bright border border-outline-variant/20 p-3 text-xs font-bold uppercase tracking-widest text-on-surface transition-all duration-fast"
    >
      View on Amazon
      <span class="material-symbols-outlined text-sm">open_in_new</span>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const isNew = computed(() => {
  if (!props.book.publishedAt) return false
  const published = new Date(props.book.publishedAt)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return published > thirtyDaysAgo
})
</script>
