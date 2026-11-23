<template>
  <aside aria-hidden="true" inert data-lenis-prevent role="dialog" aria-modal="true" :aria-label="t('Menú', 'Menu')" id="menu">
    <button type="button" :aria-label="t('Cerrar menú', 'Close menu')" class="menuClose" id="menuClose"><SiteIcon name="close" /></button>
    <span class="meta">{{ t('EL MAPA', 'SITE MAP') }} / 01—04</span>
    <nav :aria-label="t('Secciones del portfolio', 'Portfolio sections')">
      <a :href="`${homePath}#proyectos`">{{ t('Proyectos', 'Work') }}</a>
      <a :href="`${homePath}#servicios`">{{ t('Servicios', 'Services') }}</a>
      <a :href="`${homePath}#sobre-mi`">{{ t('Sobre mí', 'About') }}</a>
      <a :href="`${homePath}#contacto`">{{ t('Contacto', 'Contact') }}</a>
    </nav>
    <span class="meta menuEnd">{{ t('DISEÑO × CÓDIGO', 'DESIGN × CODE') }} · MATÍAS MOLLICA</span>
  </aside>
</template>
<script setup lang="ts">
const { t, homePath } = usePortfolioLocale()
</script>
