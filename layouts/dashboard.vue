<template>
  <div class="min-h-screen bg-surface">
    <DashboardHeader />
    <div class="flex pt-16">
      <DashboardSidebar />
      <main class="flex-1 ml-64 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
