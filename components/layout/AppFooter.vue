<template>
  <footer class="bg-surface-dim w-full py-12 px-8 border-t border-outline-variant/10 mt-24">
    <div class="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto gap-8">
      <div class="flex flex-col items-center md:items-start">
        <div class="text-primary font-bold text-xl font-headline uppercase tracking-tighter mb-2">
          Noir Gallery
        </div>
        <p class="font-body text-xs tracking-wide text-on-surface-variant uppercase">
          © {{ new Date().getFullYear() }} The Noir Gallery. All artwork retained by original creators.
        </p>
      </div>
      
      <div class="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
        <NuxtLink to="/terms" class="text-on-surface-variant hover:text-primary transition-all uppercase">
          Terms of Curation
        </NuxtLink>
        <NuxtLink to="/privacy" class="text-on-surface-variant hover:text-primary transition-all uppercase">
          Privacy Protocol
        </NuxtLink>
        <NuxtLink to="/guidelines" class="text-on-surface-variant hover:text-primary transition-all uppercase">
          Artist Guidelines
        </NuxtLink>
        <NuxtLink to="/support" class="text-on-surface-variant hover:text-primary transition-all uppercase">
          Support
        </NuxtLink>
      </div>
      
      <div class="flex gap-4">
        <span class="material-symbols-outlined text-secondary cursor-pointer hover:text-primary transition-all">share</span>
        <span class="material-symbols-outlined text-secondary cursor-pointer hover:text-primary transition-all">rss_feed</span>
      </div>
    </div>
  </footer>
</template>
