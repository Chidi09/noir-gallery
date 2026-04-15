<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-headline text-4xl font-bold uppercase tracking-tighter text-on-surface">Author Moderation</h1>
      
      <div class="flex gap-2">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="currentFilter = filter.value"
          class="px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors"
          :class="currentFilter === filter.value ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="bg-surface-container-high rounded-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-surface-container-low">
          <tr>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Pen Name</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Email</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Joined</th>
            <th class="text-left px-6 py-4 text-xs uppercase tracking-widest text-on-surface-variant">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in filteredAuthors" :key="author.id" class="border-t border-outline-variant/10">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-surface-container-low rounded-full overflow-hidden">
                  <img v-if="author.avatarUrl" :src="author.avatarUrl" class="w-full h-full object-cover" />
                  <span v-else class="material-symbols-outlined text-on-surface-variant flex items-center justify-center h-full">person</span>
                </div>
                <span class="font-bold text-on-surface">{{ author.penName }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-on-surface-variant">{{ author.user?.email }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-3 py-1 text-xs font-bold uppercase rounded-full"
                :class="statusClasses[author.status]"
              >
                {{ author.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-on-surface-variant">{{ formatDate(author.createdAt) }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button 
                  v-if="author.status === 'PENDING'"
                  @click="approveAuthor(author.id)"
                  class="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase hover:bg-primary hover:text-on-primary transition-colors"
                >
                  Approve
                </button>
                <button 
                  v-if="author.status === 'APPROVED'"
                  @click="suspendAuthor(author.id)"
                  class="px-3 py-1 bg-error/20 text-error text-xs font-bold uppercase hover:bg-error hover:text-on-error transition-colors"
                >
                  Suspend
                </button>
                <NuxtLink 
                  :to="`/authors/${author.slug}`"
                  target="_blank"
                  class="px-3 py-1 border border-outline-variant/30 text-on-surface-variant text-xs font-bold uppercase hover:text-on-surface transition-colors"
                >
                  View
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: authors, refresh } = await useFetch('/api/admin/authors')

const currentFilter = ref('ALL')
const filters = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
]

const statusClasses = {
  'PENDING': 'bg-secondary/20 text-secondary',
  'APPROVED': 'bg-primary/20 text-primary',
  'SUSPENDED': 'bg-error/20 text-error'
}

const filteredAuthors = computed(() => {
  if (currentFilter.value === 'ALL') return authors.value
  return authors.value?.filter(a => a.status === currentFilter.value)
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

async function approveAuthor(id) {
  await $fetch(`/api/admin/authors/${id}`, {
    method: 'PATCH',
    body: { status: 'APPROVED' }
  })
  await refresh()
}

async function suspendAuthor(id) {
  await $fetch(`/api/admin/authors/${id}`, {
    method: 'PATCH',
    body: { status: 'SUSPENDED' }
  })
  await refresh()
}
</script>
