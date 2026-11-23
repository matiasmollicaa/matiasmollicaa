<template>
  <header class="nav">
    <a :aria-label="t('Volver al inicio', 'Back to home')" class="brand" :href="`${homePath}#inicio`">
      <img alt="" :src="sitePath('/images/monograma-b.png')" />
      <b>Matías<br />Mollica</b>
    </a>
    <nav :aria-label="t('Navegación principal', 'Main navigation')" class="navLinks">
      <a :href="`${homePath}#proyectos`">{{ t('Proyectos', 'Work') }}</a>
      <a :href="`${homePath}#servicios`">{{ t('Servicios', 'Services') }}</a>
      <a :href="`${homePath}#sobre-mi`">{{ t('Sobre mí', 'About') }}</a>
      <a :href="`${homePath}#contacto`">{{ t('Contacto', 'Contact') }}</a>
    </nav>
    <div class="navActions">
      <a class="languageSwitch" :href="alternatePath" :lang="t('en', 'es')" :hreflang="t('en', 'es')" :aria-label="t('Read in English', 'Leer en español')" :title="t('Read in English', 'Leer en español')">{{ t('EN', 'ES') }}</a>
      <button type="button" :aria-label="t('Modo oscuro', 'Dark mode')" :aria-pressed="dark" class="roundBtn" :title="t('Cambiar tema', 'Switch color theme')" @click="$emit('toggle-theme')">
        <SiteIcon name="theme" />
      </button>
      <button type="button" :aria-label="t('Menú', 'Menu')" aria-expanded="false" aria-controls="menu" aria-haspopup="dialog" class="hamb" id="menuBtn">
        <span>{{ t('Menú', 'Menu') }}</span>
        <SiteIcon name="menu" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ dark: boolean }>()
defineEmits<{ 'toggle-theme': [] }>()
const { t, homePath, alternatePath } = usePortfolioLocale()
const sitePath = useSitePath()
</script>
