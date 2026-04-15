<template>
  <div>
    <h1 class="font-headline text-3xl font-bold uppercase tracking-tighter mb-8 text-on-surface">Analytics</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-surface-container-high p-6 rounded-sm">
        <span class="material-symbols-outlined text-3xl text-secondary mb-4">visibility</span>
        <p class="text-4xl font-headline font-bold text-on-surface mb-2">0</p>
        <p class="text-on-surface-variant text-xs uppercase tracking-widest">Profile Views</p>
      </div>
      
      <div class="bg-surface-container-high p-6 rounded-sm">
        <span class="material-symbols-outlined text-3xl text-secondary mb-4">menu_book</span>
        <p class="text-4xl font-headline font-bold text-on-surface mb-2">0</p>
        <p class="text-on-surface-variant text-xs uppercase tracking-widest">Book Views</p>
      </div>
      
      <div class="bg-surface-container-high p-6 rounded-sm">
        <span class="material-symbols-outlined text-3xl text-secondary mb-4">open_in_new</span>
        <p class="text-4xl font-headline font-bold text-on-surface mb-2">0</p>
        <p class="text-on-surface-variant text-xs uppercase tracking-widest">Amazon Clicks</p>
      </div>
    </div>

    <div class="bg-surface-container-high p-8 rounded-sm text-center">
      <span class="material-symbols-outlined text-6xl text-outline-variant mb-4">analytics</span>
      <h3 class="font-headline text-xl font-bold uppercase mb-2 text-on-surface">Analytics Coming Soon</h3>
      <p class="text-on-surface-variant">Detailed analytics will be available once your books start getting views.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
  requiresAuth: true
})
</script>
