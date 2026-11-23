<template>
  <div id="grain" aria-hidden="true"></div>
  <div id="cursor" aria-hidden="true"></div>
  <div id="progress" aria-hidden="true"></div>
  <div ref="themeWipe" id="themeWipe" aria-hidden="true"></div>
  <div id="siteContent">
    <a class="skipLink" href="#contenido">{{ t('Saltar al contenido', 'Skip to content') }}</a>
    <SiteHeader :dark="isDark" @toggle-theme="toggleTheme" />
    <NuxtPage />
    <SiteFooter />
  </div>
  <SiteMenu />
  <ContactDialog />
</template>
<script setup lang="ts">
import { initializeInteractions } from './composables/useSiteInteractions'

const { t, localPaths } = usePortfolioLocale()
const config = useRuntimeConfig()
const sitePath = useSitePath()
const origin = config.public.siteUrl || useRequestURL().origin
const savedTheme = useCookie<'dark' | 'light'>('portfolio-theme', {
  default: () => 'dark',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})
const theme = useState<'dark' | 'light'>('portfolio-theme', () => savedTheme.value === 'light' ? 'light' : 'dark')
const isDark = computed(() => theme.value !== 'light')
const themeWipe = ref<HTMLElement | null>(null)
let switchTimer: ReturnType<typeof setTimeout> | undefined
let wipeTimer: ReturnType<typeof setTimeout> | undefined
let stopInteractions: (() => void) | undefined

function applyTheme() {
  theme.value = isDark.value ? 'light' : 'dark'
  savedTheme.value = theme.value
  document.body.classList.toggle('dark', isDark.value)
  window.dispatchEvent(new Event('brand-theme-change'))
}

function toggleTheme() {
  if (themeWipe.value?.classList.contains('run')) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme()
    return
  }
  themeWipe.value?.classList.add('run')
  switchTimer = setTimeout(applyTheme, 480)
  wipeTimer = setTimeout(() => themeWipe.value?.classList.remove('run'), 1100)
}

onMounted(() => {
  // Static HTML starts dark; restore a saved preference after hydration.
  theme.value = savedTheme.value === 'light' ? 'light' : 'dark'
  document.body.classList.toggle('dark', isDark.value)
  window.dispatchEvent(new Event('brand-theme-change'))
  stopInteractions = initializeInteractions(t)
})
onUnmounted(() => {
  clearTimeout(switchTimer)
  clearTimeout(wipeTimer)
  stopInteractions?.()
})

useHead(() => ({
  htmlAttrs: {
    lang: t('es-UY', 'en'),
    'data-portfolio-theme': isDark.value ? 'dark' : 'light',
    style: `--monogram-mask: url("${sitePath('/images/monograma-b.png')}")`,
  },
  bodyAttrs: { class: isDark.value ? 'dark' : undefined },
  meta: [
    { name: 'description', content: t('Matías Mollica: diseño de comunicación visual y desarrollo frontend. Identidades y experiencias digitales con creatividad y criterio.', 'Matías Mollica, visual communication designer and frontend developer. Visual identities and thoughtfully built digital experiences.') },
    { name: 'theme-color', content: isDark.value ? '#1E191B' : '#FAF9F6' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: sitePath('/favicon.svg') },
    { rel: 'alternate', hreflang: 'es', href: new URL(sitePath(localPaths.value.es), origin).href },
    { rel: 'alternate', hreflang: 'en', href: new URL(sitePath(localPaths.value.en), origin).href },
  ],
}))
</script>
