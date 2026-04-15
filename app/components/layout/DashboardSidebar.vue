<template>
  <aside class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-surface-container-low border-r border-outline-variant/10 overflow-y-auto">
    <nav class="p-4 space-y-2">
      <NuxtLink 
        to="/dashboard" 
        class="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors"
        :class="$route.path === '/dashboard' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'"
      >
        <span class="material-symbols-outlined">dashboard</span>
        <span class="font-body text-sm">Overview</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/dashboard/books" 
        class="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors"
        :class="$route.path.startsWith('/dashboard/books') ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'"
      >
        <span class="material-symbols-outlined">menu_book</span>
        <span class="font-body text-sm">My Books</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/dashboard/profile" 
        class="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors"
        :class="$route.path === '/dashboard/profile' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'"
      >
        <span class="material-symbols-outlined">person</span>
        <span class="font-body text-sm">My Profile</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/dashboard/analytics" 
        class="flex items-center gap-3 px-4 py-3 rounded-sm transition-colors"
        :class="$route.path === '/dashboard/analytics' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'"
      >
        <span class="material-symbols-outlined">analytics</span>
        <span class="font-body text-sm">Analytics</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
