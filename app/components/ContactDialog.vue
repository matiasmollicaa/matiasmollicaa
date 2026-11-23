<template>
  <div aria-hidden="true" inert data-lenis-prevent aria-labelledby="dialogQuestion" aria-modal="true" id="contactPanel" role="dialog">
    <div class="dialog">
      <button type="button" :aria-label="t('Cerrar', 'Close')" class="closeDialog" id="dialogClose"><SiteIcon name="close" /></button>
      <span class="meta" id="dialogCount">01 / 03</span>
      <h3 id="dialogQuestion">{{ t('¿Cómo te llamás?', 'What’s your name?') }}</h3>
      <p id="dialogInfo">{{ t('Arranquemos por lo básico.', 'Let’s start with the basics.') }}</p>
      <form id="dialogForm" novalidate>
        <input aria-labelledby="dialogQuestion" aria-describedby="dialogInfo dialogError" required autocomplete="name" id="dialogInput" :placeholder="t('Tu nombre', 'Your name')" />
        <textarea aria-labelledby="dialogQuestion" aria-describedby="dialogInfo dialogError" required hidden id="dialogTextarea" :placeholder="t('Contame de qué se trata', 'Tell me what it’s about')" rows="3"></textarea>
        <p aria-live="polite" class="error" id="dialogError"></p>
        <div class="dialogButtons">
          <button id="dialogBack" class="iconLink" style="background:transparent;border:1px solid #251D1B;color:#251D1B" type="button"><SiteIcon name="left" /> {{ t('Volver', 'Back') }}</button>
          <button id="dialogNext" class="iconLink" type="submit"><span id="dialogNextLabel">{{ t('Siguiente', 'Next') }}</span> <SiteIcon name="right" /></button>
        </div>
      </form>
      <p style="font-size:11px;color:#655d59">{{ t('La última acción abre tu aplicación de correo con el mensaje listo para revisar.', 'The final step opens your email app with a draft to review.') }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = usePortfolioLocale()
</script>
