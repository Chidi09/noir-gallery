<template>
  <div class="min-h-screen bg-surface">
    <header class="fixed top-0 w-full z-50 bg-surface-dim/95 backdrop-blur-xl border-b border-outline-variant/10 h-16">
      <div class="flex justify-between items-center px-6 h-full">
        <div class="flex items-center gap-8">
          <NuxtLink to="/admin" class="text-xl font-bold tracking-tighter text-primary font-headline uppercase">
            Admin Panel
          </NuxtLink>
          <nav class="hidden md:flex items-center gap-6 font-headline uppercase tracking-tighter text-sm">
            <NuxtLink 
              to="/admin/authors" 
              class="text-on-surface-variant hover:text-primary transition-colors"
              :class="{ 'text-primary': $route.path === '/admin/authors' }"
            >
              Authors
            </NuxtLink>
            <NuxtLink 
              to="/admin/books" 
              class="text-on-surface-variant hover:text-primary transition-colors"
              :class="{ 'text-primary': $route.path === '/admin/books' }"
            >
              Books
            </NuxtLink>
          </nav>
        </div>
        
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-on-surface-variant hover:text-primary transition-colors text-sm font-headline uppercase">
            View Site
          </NuxtLink>
          <button 
            @click="logout"
            class="text-on-surface-variant hover:text-primary transition-colors text-sm font-headline uppercase"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
    
    <main class="pt-24 px-8 pb-12">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { logout } = useAuth()
</script>
