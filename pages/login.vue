<template>
  <div class="min-h-screen flex items-center justify-center px-4 pt-24">
    <div class="w-full max-w-md">
      <div class="text-center mb-12">
        <h1 class="font-headline text-4xl font-bold uppercase tracking-tighter mb-4 text-on-surface">Welcome Back</h1>
        <p class="text-on-surface-variant">Sign in to your creator account</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
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
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        
        <div v-if="error" class="text-error text-sm">{{ error }}</div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="w-full cinematic-gradient text-on-primary py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
        >
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      
      <p class="text-center mt-8 text-on-surface-variant text-sm">
        Don't have an account? 
        <NuxtLink to="/join" class="text-primary hover:underline">Join the Circle</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const { login, fetchUser } = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  
  try {
    await login(form.value.email, form.value.password)
    await fetchUser()
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
