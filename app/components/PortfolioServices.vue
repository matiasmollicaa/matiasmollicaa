<template>
  <section class="section services" id="servicios" aria-labelledby="services-title">
    <div class="sectionLabel meta"><span class="count">03</span> / {{ t('LO QUE PUEDO HACER', 'WHAT I CAN DO') }}</div>
    <h2 class="sectionTitle reveal" id="services-title">
      {{ t('Del concepto', 'From concept') }}<br />{{ t('a la', 'to') }}
      <Transition name="service-word" mode="out-in">
        <span :key="current" class="textRotate">{{ service.word }}</span>
      </Transition>
    </h2>
    <div class="serviceRow">
      <div class="serviceList" role="group" :aria-label="t('Elegir un servicio', 'Choose a service')">
        <button
          v-for="(item, index) in services"
          :key="item.name"
          type="button"
          class="serviceItem"
          :class="{ current: index === current }"
          :aria-pressed="index === current"
          aria-controls="serviceCaption"
          @click="current = index"
        >
          <span class="number" aria-hidden="true">0{{ index + 1 }}</span>
          <span class="serviceName">{{ item.name }}</span>
        </button>
      </div>
      <div class="serviceVisual">
        <div class="glassPanel" aria-hidden="true"></div>
        <div class="serviceGlyph" aria-hidden="true">{{ service.glyph }}</div>
        <p class="serviceCaption" id="serviceCaption" aria-live="polite" aria-atomic="true">{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = usePortfolioLocale()
const current = ref(0)
const services = computed(() => [
  {
    name: t('Identidad visual', 'Visual identity'),
    word: t('experiencia.', 'an experience.'),
    glyph: 'M',
    description: t('Sistemas de identidad, marcas y recursos gráficos que comunican con carácter.', 'Brand identities and graphic systems with a distinct voice.'),
  },
  {
    name: t('Diseño digital', 'Digital design'),
    word: t('interacción.', 'interaction.'),
    glyph: '×',
    description: t('Interfaces, jerarquías y experiencias donde cada gesto tiene una razón.', 'Interfaces and visual hierarchies that make each interaction purposeful.'),
  },
  {
    name: t('Desarrollo web', 'Web development'),
    word: t('función.', 'a working site.'),
    glyph: '</>',
    description: t('Sitios y aplicaciones responsivas que traducen ideas visuales en código.', 'Responsive websites and apps that translate visual ideas into code.'),
  },
  {
    name: t('Motion y video', 'Motion and video'),
    word: t('movimiento.', 'motion.'),
    glyph: '✳',
    description: t('Animaciones, edición de video y recursos para publicaciones y experiencias web.', 'Animation, video editing and assets for social posts and web experiences.'),
  },
  {
    name: 'Moodle',
    word: t('aprendizaje.', 'learning.'),
    glyph: '+',
    description: t('Personalización visual y administración de campus Moodle: interfaz, cursos, usuarios, reportes y certificados.', 'Visual customization and administration for Moodle: interfaces, courses, users, reports and certificates.'),
  },
])
const service = computed(() => services.value[current.value]!)
</script>

<style scoped>
.serviceItem {
  width: 100%;
  text-align: start;
  border: 0;
  border-bottom: 1px solid #ffffff55;
  background: transparent;
  color: #bcb4bf;
  opacity: 1;
}

.serviceItem.current, .serviceItem:hover { color: #f8f7f2; }
.serviceName {
  font-family: Basteleur, Georgia, serif;
  font-size: clamp(32px, 4.2vw, 70px);
  font-weight: 400;
  line-height: 1.05;
}

.serviceCaption { margin: 0; }
.service-word-enter-from, .service-word-leave-to { opacity: 0; transform: rotate(-5deg) translateY(12px); }
</style>
