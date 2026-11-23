<template>
  <footer class="footer">
    <span>© 2026 MATÍAS MOLLICA · {{ t('IDENTIDAD EN DESARROLLO', 'IDENTITY IN PROGRESS') }}</span>
    <span>{{ t('CONCEPTO / RITMO — TRANSFORMACIÓN — CRITERIO', 'CONCEPT / RHYTHM — TRANSFORMATION — INTENTION') }}</span>
    <a class="iconLink" href="#contenido">{{ t('VOLVER ARRIBA', 'BACK TO TOP') }} <SiteIcon name="up" /></a>
  </footer>
</template>
<script setup lang="ts">
const { t } = usePortfolioLocale()
</script>
