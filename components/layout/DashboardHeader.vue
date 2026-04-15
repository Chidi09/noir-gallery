<template>
  <header class="fixed top-0 w-full z-50 bg-surface-dim/95 backdrop-blur-xl border-b border-outline-variant/10 h-16">
    <div class="flex justify-between items-center px-6 h-full">
      <NuxtLink to="/" class="text-xl font-bold tracking-tighter text-primary font-headline uppercase">
        Noir Gallery
      </NuxtLink>
      
      <div class="flex items-center gap-6">
        <span class="text-on-surface-variant text-sm font-body">
          {{ user?.authorProfile?.penName || user?.email }}
        </span>
        <button 
          @click="logout"
          class="text-on-surface-variant hover:text-primary transition-colors text-sm font-headline uppercase"
        >
          Log Out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { user, logout } = useAuth()
</script>
