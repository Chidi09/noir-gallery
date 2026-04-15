<template>
  <nav class="fixed top-0 w-full z-50 bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/10">
    <div class="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold tracking-tighter text-primary font-headline uppercase">
        Noir Gallery
      </NuxtLink>

      <!-- Navigation -->
      <div class="hidden md:flex items-center gap-8 font-headline uppercase tracking-tighter text-sm">
        <NuxtLink 
          to="/authors" 
          class="text-on-surface-variant hover:text-primary transition-colors duration-300"
          :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path.startsWith('/authors') }"
        >
          Artists
        </NuxtLink>
        <NuxtLink 
          to="/books" 
          class="text-on-surface-variant hover:text-primary transition-colors duration-300"
          :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path.startsWith('/books') }"
        >
          Collections
        </NuxtLink>
        <NuxtLink 
          to="/genres" 
          class="text-on-surface-variant hover:text-primary transition-colors duration-300"
          :class="{ 'text-primary border-b-2 border-primary pb-1': $route.path.startsWith('/genres') }"
        >
          Exhibits
        </NuxtLink>
      </div>

      <!-- Auth -->
      <div class="flex items-center gap-4">
        <template v-if="isLoggedIn">
          <NuxtLink 
            v-if="isAuthor"
            to="/dashboard" 
            class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline uppercase text-sm"
          >
            Dashboard
          </NuxtLink>
          <button 
            @click="logout" 
            class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline uppercase text-sm"
          >
            Log Out
          </button>
        </template>
        <template v-else>
          <NuxtLink 
            to="/login" 
            class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline uppercase text-sm"
          >
            Log In
          </NuxtLink>
          <NuxtLink 
            to="/join" 
            class="bg-primary text-on-primary px-5 py-2 text-sm font-bold font-headline uppercase rounded-sm hover:brightness-110 transition-all"
          >
            Join the Circle
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { isLoggedIn, isAuthor, logout } = useAuth()
</script>
