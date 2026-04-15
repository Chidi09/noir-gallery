<template>
  <div class="pt-24 px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <h1 class="font-headline text-5xl font-bold uppercase tracking-tighter mb-4 text-on-surface">Artists</h1>
        <p class="text-on-surface-variant max-w-xl">Discover independent comic creators pushing the boundaries of visual storytelling.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="author in authors" 
          :key="author.id"
          :to="`/authors/${author.slug}`"
          class="group bg-surface-container-high rounded-sm overflow-hidden hover:-translate-y-2 transition-transform duration-500"
        >
          <div class="aspect-[16/9] bg-surface-container-low relative overflow-hidden">
            <img 
              v-if="author.bannerUrl"
              :src="author.bannerUrl"
              :alt="author.penName"
              class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-container-low"></div>
          </div>
          <div class="p-6 flex items-start gap-4">
            <div class="w-16 h-16 bg-surface-container-lowest rounded-full overflow-hidden shrink-0 -mt-12 border-4 border-surface-container-high">
              <img 
                v-if="author.avatarUrl"
                :src="author.avatarUrl"
                :alt="author.penName"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-surface-variant">
                <span class="material-symbols-outlined text-on-surface-variant">person</span>
              </div>
            </div>
            <div>
              <h3 class="font-headline text-xl font-bold uppercase mb-1 text-on-surface">{{ author.penName }}</h3>
              <p class="text-secondary text-xs font-bold uppercase">{{ author._count.books }} Works</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: authors } = await useFetch('/api/authors')
</script>
