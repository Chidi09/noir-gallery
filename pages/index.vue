<template>
  <div class="pt-24">
    <!-- Hero Section -->
    <section class="relative px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 z-10">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-[2px] bg-primary"></div>
            <span class="text-secondary font-bold tracking-widest text-xs uppercase">Curated Discovery</span>
          </div>
          <h1 class="font-headline text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-8 text-on-surface">
            Discover Independent <br/>
            <span class="text-primary italic">Comic Creators</span>
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Step into a curated digital auction house where indie narratives meet high-end editorial artistry. No clutter. Just pure storytelling.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/authors" 
              class="cinematic-gradient text-on-primary px-8 py-4 font-bold uppercase text-sm tracking-widest rounded-sm hover:scale-[1.02] transition-transform inline-block"
            >
              Start Exploring
            </NuxtLink>
            <NuxtLink 
              to="/join" 
              class="border border-outline-variant/30 text-on-surface px-8 py-4 font-bold uppercase text-sm tracking-widest rounded-sm hover:bg-surface-container-high transition-colors inline-block"
            >
              Join as Author
            </NuxtLink>
          </div>
        </div>
        <div class="lg:col-span-5 relative">
          <div class="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" 
              alt="Featured comic artwork"
              class="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
            />
            <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
              <span class="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Featured Artist</span>
              <h3 class="font-headline text-3xl font-bold uppercase text-on-surface">Elena 'Void' Rossi</h3>
              <p class="text-secondary text-sm font-medium">Cyber-Noir Specialist</p>
            </div>
          </div>
          <div class="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/40 -z-10"></div>
        </div>
      </div>
    </section>

    <!-- Genre Chips -->
    <section class="bg-surface-container-low py-12 px-8">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex items-center gap-3 shrink-0">
          <div class="w-1 h-8 bg-secondary"></div>
          <h2 class="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">Browse by Genre</h2>
        </div>
        <div class="flex flex-wrap justify-center md:justify-end gap-3">
          <NuxtLink 
            v-for="genre in genres" 
            :key="genre.slug"
            :to="`/genres/${genre.slug}`"
            class="px-6 py-2 rounded-full bg-surface-variant border border-outline-variant/20 text-on-surface-variant text-sm font-medium hover:bg-secondary-container hover:text-on-secondary-container transition-all"
          >
            {{ genre.name }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Authors -->
    <section class="px-8 py-24 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-16">
        <div>
          <h2 class="font-headline text-4xl font-bold uppercase tracking-tighter mb-4 text-on-surface">Featured Authors</h2>
          <p class="text-on-surface-variant max-w-md">Masters of the medium currently leading our curated collections.</p>
        </div>
        <NuxtLink to="/authors" class="text-primary text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-secondary transition-colors">
          View All Artists
        </NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
        <!-- Large Featured -->
        <div class="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-surface-container-high rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" 
            alt="Featured author"
            class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
            <span class="text-secondary font-bold text-xs uppercase tracking-widest mb-2">Author Spotlight</span>
            <h3 class="font-headline text-4xl font-bold uppercase mb-2 text-on-surface">Marcus Thorne</h3>
            <p class="text-on-surface-variant text-sm mb-6 max-w-xs">Pioneer of the "Brutalist Ink" movement. Winner of 3 Indie Ink Awards.</p>
            <NuxtLink to="/authors/marcus-thorne" class="w-fit text-primary font-bold text-xs uppercase tracking-widest border border-primary/40 px-4 py-2 hover:bg-primary hover:text-on-primary transition-all">
              Explore Portfolio
            </NuxtLink>
          </div>
        </div>
        
        <!-- Smaller Author Cards -->
        <div v-for="i in 3" :key="i" class="relative group overflow-hidden bg-surface-container-high rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80" 
            :alt="`Author ${i}`"
            class="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 p-4 flex flex-col justify-end">
            <h3 class="font-headline text-lg font-bold uppercase text-on-surface">Artist {{ i }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- New Releases -->
    <section class="bg-surface-container-low py-24 px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center gap-4 mb-16">
          <h2 class="font-headline text-4xl font-bold uppercase tracking-tighter shrink-0 text-on-surface">New Releases</h2>
          <div class="h-px bg-outline-variant/30 w-full"></div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <BookCard v-for="i in 4" :key="i" :book="{ id: i, title: `Book ${i}`, author: { penName: `Author ${i}` } }" />
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-32 px-8 max-w-7xl mx-auto text-center">
      <div class="bg-surface-container-highest p-12 md:p-24 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] -z-10"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10"></div>
        <h2 class="font-headline text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-on-surface">Enter The Gallery</h2>
        <p class="text-on-surface-variant max-w-2xl mx-auto mb-12 text-lg">
          Join our exclusive circle of collectors and creators. Get first access to limited edition prints, author interviews, and underground releases.
        </p>
        <div class="max-w-md mx-auto flex flex-col md:flex-row gap-0 border border-outline-variant/30">
          <input 
            type="email" 
            placeholder="YOUR EMAIL PROTOCOL" 
            class="flex-grow bg-transparent border-none px-6 py-4 text-sm font-bold uppercase focus:ring-0 placeholder:text-outline/50 text-on-surface"
          />
          <button class="bg-primary text-on-primary font-bold uppercase px-8 py-4 text-sm tracking-widest hover:brightness-110 transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: genres } = useFetch('/api/genres', {
  server: true,
  default: () => []
})
</script>
