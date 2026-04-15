<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter text-on-surface">Edit Book</h1>
      <span 
        class="text-xs font-bold uppercase px-3 py-1 rounded-full"
        :class="statusClasses[book?.status]"
      >
        {{ book?.status }}
      </span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-surface-container-high p-6 rounded-sm">
          <h2 class="font-headline text-lg font-bold uppercase mb-6 panel-accent pl-4 text-on-surface">Book Details</h2>
          
          <form @submit.prevent="saveBook" class="space-y-6">
            <!-- Title -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Title *
              </label>
              <input 
                v-model="form.title"
                type="text" 
                required
                class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            
            <!-- Series -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Series Name
                </label>
                <input 
                  v-model="form.seriesName"
                  type="text" 
                  class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                  Volume Number
                </label>
                <input 
                  v-model="form.volumeNumber"
                  type="number" 
                  min="1"
                  class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <!-- Genre -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Genre *
              </label>
              <select 
                v-model="form.genreId"
                required
                class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select a genre</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                  {{ genre.name }}
                </option>
              </select>
            </div>
            
            <!-- Synopsis -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Synopsis *
              </label>
              <textarea 
                v-model="form.synopsis"
                rows="4"
                required
                class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>
            
            <!-- Cover Image URL -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Cover Image URL *
              </label>
              <input 
                v-model="form.coverImageUrl"
                type="url" 
                required
                placeholder="https://..."
                class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
              <p class="text-xs text-on-surface-variant mt-1">Enter a direct URL to your book cover image</p>
            </div>
            
            <!-- Publication Date -->
            <div>
              <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Publication Date
              </label>
              <input 
                v-model="form.publicationDate"
                type="date" 
                class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            
            <div v-if="saveError" class="text-error text-sm bg-error/10 p-4 rounded-sm">{{ saveError }}</div>
            
            <div class="flex gap-4 pt-4">
              <button 
                type="submit"
                :disabled="saving"
                class="cinematic-gradient text-on-primary px-8 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
              >
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
              <NuxtLink 
                to="/dashboard/books"
                class="border border-outline-variant/30 text-on-surface px-6 py-3 font-bold uppercase text-sm tracking-widest hover:bg-surface-container transition-all"
              >
                Cancel
              </NuxtLink>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Preview -->
      <div>
        <div class="bg-surface-container-high p-6 rounded-sm sticky top-24">
          <h2 class="font-headline text-lg font-bold uppercase mb-6 panel-accent pl-4 text-on-surface">Preview</h2>
          <div class="aspect-[2/3] bg-surface-container-low mb-4 rounded-sm overflow-hidden">
            <img 
              v-if="form.coverImageUrl"
              :src="form.coverImageUrl"
              :alt="form.title"
              class="w-full h-full object-cover"
              @error="$event.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-on-surface-variant">
              <span class="material-symbols-outlined text-6xl">image</span>
            </div>
          </div>
          <h3 class="font-headline text-xl font-bold uppercase mb-1 text-on-surface">{{ form.title || 'Untitled' }}</h3>
          <p v-if="form.seriesName" class="text-secondary text-xs uppercase mb-2">{{ form.seriesName }}</p>
          <p class="text-on-surface-variant text-sm line-clamp-3">{{ form.synopsis || 'No synopsis provided' }}</p>
          
          <div class="mt-6 pt-6 border-t border-outline-variant/20">
            <a 
              v-if="book?.links?.[0]"
              :href="book.links[0].url"
              target="_blank"
              class="flex items-center justify-center gap-2 w-full py-3 bg-surface-variant/50 hover:bg-surface-bright border border-outline-variant/20 text-on-surface text-xs font-bold uppercase tracking-widest transition-all"
            >
              View on Amazon
              <span class="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
          
          <button 
            v-if="book?.status === 'DRAFT'"
            @click="publish"
            :disabled="publishing"
            class="w-full mt-4 bg-primary/20 text-primary border border-primary/40 py-3 font-bold uppercase text-sm tracking-widest hover:bg-primary hover:text-on-primary transition-all disabled:opacity-50"
          >
            {{ publishing ? 'Publishing...' : 'Publish Book' }}
          </button>
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

const route = useRoute()
const router = useRouter()
const bookId = route.params.id

const { data: book } = await useFetch(`/api/dashboard/books/${bookId}`)
const { data: genres } = await useFetch('/api/genres')

const form = ref({
  title: book.value?.title || '',
  seriesName: book.value?.seriesName || '',
  volumeNumber: book.value?.volumeNumber || null,
  genreId: book.value?.genreId || '',
  synopsis: book.value?.synopsis || '',
  coverImageUrl: book.value?.coverImageUrl || '',
  publicationDate: book.value?.publicationDate ? new Date(book.value.publicationDate).toISOString().split('T')[0] : ''
})

const saving = ref(false)
const saveError = ref('')
const publishing = ref(false)

const statusClasses = {
  'DRAFT': 'bg-surface-variant text-on-surface-variant',
  'REVIEW': 'bg-secondary/20 text-secondary',
  'PUBLISHED': 'bg-primary/20 text-primary',
  'REJECTED': 'bg-error/20 text-error'
}

async function saveBook() {
  saving.value = true
  saveError.value = ''
  
  try {
    await $fetch(`/api/dashboard/books/${bookId}`, {
      method: 'PATCH',
      body: {
        ...form.value,
        volumeNumber: form.value.volumeNumber ? parseInt(form.value.volumeNumber) : null
      }
    })
    
    // Show success toast or feedback
  } catch (e) {
    saveError.value = e.message || 'Failed to save changes'
  } finally {
    saving.value = false
  }
}

async function publish() {
  publishing.value = true
  try {
    await $fetch(`/api/dashboard/books/${bookId}/publish`, {
      method: 'POST'
    })
    
    // Refresh the page to show updated status
    await navigateTo(`/dashboard/books/${bookId}/edit`, { replace: true })
  } catch (e) {
    saveError.value = e.message || 'Failed to publish book'
  } finally {
    publishing.value = false
  }
}
</script>
