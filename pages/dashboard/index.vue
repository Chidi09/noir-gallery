<template>
  <div>
    <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter mb-8 text-on-surface">Welcome back, {{ user?.authorProfile?.penName }}</h1>
    
    <!-- Quick Add Book -->
    <div class="bg-surface-container-high p-6 rounded-sm mb-8">
      <h2 class="font-headline text-lg font-bold uppercase mb-4 text-on-surface">Quick Add Book</h2>
      <form @submit.prevent="createDraft" class="flex gap-4">
        <input 
          v-model="amazonUrl"
          type="url" 
          placeholder="Paste Amazon URL here..."
          required
          class="flex-1 bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none"
        />
        <button 
          type="submit"
          :disabled="loading"
          class="cinematic-gradient text-on-primary px-6 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
        >
          {{ loading ? 'Creating...' : 'Create Draft' }}
        </button>
      </form>
    </div>

    <!-- Drafts -->
    <div v-if="drafts?.length" class="mb-12">
      <h2 class="font-headline text-xl font-bold uppercase mb-6 panel-accent pl-4 text-on-surface">Drafts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="book in drafts" :key="book.id" class="bg-surface-container-high p-4 rounded-sm">
          <div class="aspect-[2/3] bg-surface-container-low mb-4">
            <img 
              v-if="book.coverImageUrl"
              :src="book.coverImageUrl"
              :alt="book.title"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="font-headline text-lg font-bold uppercase mb-2 text-on-surface">{{ book.title || 'Untitled' }}</h3>
          <p class="text-on-surface-variant text-sm mb-4">{{ book.status }}</p>
          <NuxtLink 
            :to="`/dashboard/books/${book.id}/edit`"
            class="block w-full text-center border border-primary/40 text-primary py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
          >
            Edit Draft
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Published Books -->
    <div v-if="published?.length">
      <h2 class="font-headline text-xl font-bold uppercase mb-6 panel-accent pl-4 text-on-surface">Published Books</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="book in published" :key="book.id" class="bg-surface-container-high p-4 rounded-sm">
          <div class="aspect-[2/3] bg-surface-container-low mb-4">
            <img 
              :src="book.coverImageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'"
              :alt="book.title"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="font-headline text-lg font-bold uppercase mb-2 text-on-surface">{{ book.title }}</h3>
          <p class="text-secondary text-xs font-bold uppercase mb-4">
            Published {{ formatDate(book.publishedAt) }}
          </p>
          <NuxtLink 
            :to="`/books/${book.slug}`"
            class="block w-full text-center bg-surface-variant/50 text-on-surface py-2 text-xs font-bold uppercase tracking-widest hover:bg-surface-bright transition-all"
          >
            View Public Page
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!drafts?.length && !published?.length" class="text-center py-16 bg-surface-container-high rounded-sm">
      <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">menu_book</span>
      <h3 class="font-headline text-xl font-bold uppercase mb-2 text-on-surface">No Books Yet</h3>
      <p class="text-on-surface-variant mb-6">Start by adding your first book from Amazon</p>
      <NuxtLink 
        to="/dashboard/books/new"
        class="inline-block cinematic-gradient text-on-primary px-6 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all"
      >
        Add Your First Book
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true
})

const { user } = useAuth()
const router = useRouter()

const amazonUrl = ref('')
const loading = ref(false)

const { data: books, refresh } = await useFetch('/api/dashboard/books')

const drafts = computed(() => books.value?.filter(b => b.status === 'DRAFT') || [])
const published = computed(() => books.value?.filter(b => b.status === 'PUBLISHED') || [])

async function createDraft() {
  loading.value = true
  try {
    const { data } = await useFetch('/api/dashboard/books', {
      method: 'POST',
      body: { amazonUrl: amazonUrl.value }
    })
    
    amazonUrl.value = ''
    router.push(`/dashboard/books/${data.value.id}/edit`)
  } catch (e) {
    console.error('Failed to create draft:', e)
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}
</script>
