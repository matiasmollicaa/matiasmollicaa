export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/scss/main.scss'],
  modules: [],
  app: { head: { link: [
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' },
  ] } },
  runtimeConfig: { public: { siteUrl: '' } },
  nitro: {
    prerender: {
      failOnError: true,
      crawlLinks: false,
      routes: ['/', '/en', ...['olows-comunicacion', 'krater-studio', 'ciclo', 'urufiltros'].flatMap(slug => [
        `/proyectos/${slug}`, `/en/projects/${slug}`,
      ])],
    },
  },
  vite: { css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } } },
})
