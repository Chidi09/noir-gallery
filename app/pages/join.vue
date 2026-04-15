<template>
  <div class="min-h-screen flex items-center justify-center px-4 pt-24">
    <div class="w-full max-w-md">
      <div class="text-center mb-12">
        <h1 class="font-headline text-4xl font-bold uppercase tracking-tighter mb-4 text-on-surface">Join the Circle</h1>
        <p class="text-on-surface-variant">Create your creator account</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">Pen Name</label>
          <input 
            v-model="form.penName"
            type="text" 
            required
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">Email</label>
          <input 
            v-model="form.email"
            type="email" 
            required
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
          <input 
            v-model="form.password"
            type="password" 
            required
            minlength="8"
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
          />
          <p class="text-xs text-on-surface-variant mt-1">Minimum 8 characters</p>
        </div>
        
        <div v-if="error" class="text-error text-sm">{{ error }}</div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="w-full cinematic-gradient text-on-primary py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
        >
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>
      
      <p class="text-center mt-8 text-on-surface-variant text-sm">
        Already have an account? 
        <NuxtLink to="/login" class="text-primary hover:underline">Sign In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const router = useRouter()
const { fetchUser } = useAuth()

const form = ref({
  penName: '',
  email: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  loading.value = true
  error.value = ''
  
  try {
    const { data, error: fetchError } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: form.value
    })
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Registration failed')
    }
    
    await fetchUser()
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
