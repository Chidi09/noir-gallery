<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="font-headline text-4xl font-bold uppercase tracking-tighter mb-8 text-on-surface">Admin Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/admin/authors" class="bg-surface-container-high p-8 rounded-sm hover:-translate-y-1 transition-transform">
        <span class="material-symbols-outlined text-4xl text-secondary mb-4">group</span>
        <h2 class="font-headline text-2xl font-bold uppercase mb-2 text-on-surface">Authors</h2>
        <p class="text-on-surface-variant">Manage author applications and profiles</p>
      </NuxtLink>
      
      <NuxtLink to="/admin/books" class="bg-surface-container-high p-8 rounded-sm hover:-translate-y-1 transition-transform">
        <span class="material-symbols-outlined text-4xl text-secondary mb-4">menu_book</span>
        <h2 class="font-headline text-2xl font-bold uppercase mb-2 text-on-surface">Books</h2>
        <p class="text-on-surface-variant">Moderate book submissions and content</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})
</script>
