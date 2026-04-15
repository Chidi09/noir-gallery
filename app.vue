<template>
  <div>
    <h1 style="color: white; padding: 20px;">TEST - App.vue is rendering</h1>
    <p style="color: yellow; padding: 0 20px;">Before NuxtLayout</p>
    <NuxtLayout>
      <p style="color: cyan; padding: 0 20px;">Inside NuxtLayout slot</p>
      <NuxtPage />
    </NuxtLayout>
    <p style="color: yellow; padding: 0 20px;">After NuxtLayout</p>
  </div>
</template>
