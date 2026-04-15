export default defineNuxtConfig({
  compatibilityDate: '2026-04-15',
  devtools: { enabled: true },
  modules: ['nuxt-security'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: '/api'
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://images.unsplash.com', 'https:', 'http:'],
      }
    }
  }
})
