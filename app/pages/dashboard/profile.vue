<template>
  <div>
    <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter mb-8 text-on-surface">My Profile</h1>
    
    <div class="bg-surface-container-high p-8 rounded-sm max-w-2xl">
      <div class="flex items-center gap-6 mb-8">
        <div class="w-24 h-24 bg-surface-container-lowest rounded-full overflow-hidden">
          <img 
            v-if="user?.authorProfile?.avatarUrl"
            :src="user.authorProfile.avatarUrl"
            :alt="user.authorProfile.penName"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-surface-variant">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant">person</span>
          </div>
        </div>
        <div>
          <h2 class="font-headline text-2xl font-bold uppercase text-on-surface">{{ user?.authorProfile?.penName }}</h2>
          <p class="text-on-surface-variant">{{ user?.email }}</p>
          <span 
            class="mt-2 inline-block px-3 py-1 text-xs font-bold uppercase rounded-full"
            :class="statusClasses[user?.authorProfile?.status]"
          >
            {{ user?.authorProfile?.status }}
          </span>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">Bio</label>
          <textarea 
            v-model="form.bio"
            rows="4"
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors resize-none"
            placeholder="Tell readers about yourself..."
          ></textarea>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-on-surface-variant mb-2">Website</label>
          <input 
            v-model="form.websiteUrl"
            type="url"
            class="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
            placeholder="https://your-website.com"
          />
        </div>

        <button 
          @click="saveProfile"
          :disabled="saving"
          class="cinematic-gradient text-on-primary px-8 py-3 font-bold uppercase text-sm tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
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

const { user } = useAuth()
const saving = ref(false)

const form = ref({
  bio: user.value?.authorProfile?.bio || '',
  websiteUrl: user.value?.authorProfile?.websiteUrl || ''
})

const statusClasses = {
  'PENDING': 'bg-secondary/20 text-secondary',
  'APPROVED': 'bg-primary/20 text-primary',
  'SUSPENDED': 'bg-error/20 text-error'
}

async function saveProfile() {
  saving.value = true
  // API call would go here
  await new Promise(r => setTimeout(r, 1000))
  saving.value = false
}
</script>
