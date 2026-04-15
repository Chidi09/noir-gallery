<template>
  <div>
    <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter mb-8 text-on-surface">Add New Book</h1>
    
    <div class="bg-surface-container-high p-8 rounded-sm max-w-2xl">
      <form @submit.prevent="createBook" class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">
            Amazon Link *
          </label>
          <input 
            v-model="form.amazonUrl"
            type="url" 
            placeholder="https://www.amazon.com/..."
            required
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
          />
          <p class="text-xs text-on-surface-variant mt-1">Paste the Amazon URL for your book</p>
        </div>
        
        <div v-if="error" class="text-error text-sm bg-error/10 p-4 rounded-sm">{{ error }}</div>
        
        <div class="flex gap-4 pt-4">
          <NuxtLink 
            to="/dashboard/books"
            class="border border-outline-variant/30 text-on-surface px-6 py-3 font-bold uppercase text-sm tracking-widest hover:bg-surface-container transition-all"
          >
            Cancel
          </NuxtLink>
          <button 
            type="submit"
            :disabled="loading"
            class="cinematic-gradient text-on-primary px-8 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
          >
            {{ loading ? 'Creating...' : 'Create Draft' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true
})

const router = useRouter()

const form = ref({
  amazonUrl: ''
})
const loading = ref(false)
const error = ref('')

async function createBook() {
  loading.value = true
  error.value = ''
  
  try {
    const { data, error: fetchError } = await useFetch('/api/dashboard/books', {
      method: 'POST',
      body: form.value
    })
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message)
    }
    
    router.push(`/dashboard/books/${data.value.id}/edit`)
  } catch (e) {
    error.value = e.message || 'Failed to create book draft'
  } finally {
    loading.value = false
  }
}
</script>
