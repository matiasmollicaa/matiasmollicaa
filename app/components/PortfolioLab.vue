<template>
  <section class="section lab" id="laboratorio" aria-labelledby="lab-title">
    <div class="sectionLabel meta"><span class="count">06</span>{{ t(' / LABORATORIO', ' / LAB') }}</div>
    <header class="labIntro">
      <h2 class="sectionTitle reveal" id="lab-title">{{ t('De puntos', 'From dots') }}<br /><em>{{ t('a forma.', 'to form.') }}</em></h2>
      <p>{{ t('Este portfolio es también mi espacio de prueba. Acá podés recorrer cómo se armó el monograma y qué decisiones le dieron forma al sitio.', 'This portfolio is also a place to experiment. Here you can explore how I built the monogram and the decisions that shaped the site.') }}</p>
    </header>

    <article class="labExperiment" aria-labelledby="lab-monogram">
      <div class="labText">
        <p class="meta labIndex">{{ t('01 / IDENTIDAD EN MOVIMIENTO', '01 / IDENTITY IN MOTION') }}</p>
        <h3 id="lab-monogram">{{ t('Una forma, dos emes.', 'One shape, two Ms.') }}</h3>
        <p>{{ t('Quería que el símbolo se pudiera leer primero como una forma orgánica. Las dos emes aparecen en una segunda mirada, en las curvas y los vacíos de la silueta.', 'I wanted the symbol to read as an organic shape at first. Look again and two Ms emerge from the curves and gaps in the silhouette.') }}</p>
        <p>{{ t('Tomé esa silueta como destino para los puntos. En la apertura, Three.js los trae desde posiciones dispersas y el cursor desvía los que tiene cerca. En esta muestra podés detener el proceso en cualquier momento.', 'I used the silhouette as the destination for the dots. In the hero, Three.js brings them together from scattered positions, while the cursor nudges nearby particles. Use the slider to explore any stage of that movement.') }}</p>
      </div>
      <div class="labDemo">
        <div class="labViewport" aria-hidden="true">
          <svg v-if="dots.length" viewBox="0 0 480 260">
            <circle
              v-for="(dot, index) in dots"
              :key="index"
              :cx="dot.fromX + (dot.toX - dot.fromX) * eased"
              :cy="dot.fromY + (dot.toY - dot.fromY) * eased"
              :r="dot.radius"
              :class="{ labAccent: index % 10 === 0 }"
            />
          </svg>
          <img v-else :src="sitePath('/images/monograma-b.png')" alt="" width="200" loading="lazy" />
        </div>
        <div v-if="dots.length" class="labControls">
          <div class="labControlLabels">
            <label for="lab-progress">{{ t('Transformación del símbolo', 'Monogram transformation') }}</label>
            <span>{{ phase }} · {{ progress }}%</span>
          </div>
          <input id="lab-progress" v-model.number="progress" type="range" min="0" max="100" :aria-valuetext="`${phase}, ${progress} ${t('por ciento', 'percent')}`" />
          <div class="labScale" aria-hidden="true"><span v-for="label in phases" :key="label">{{ label }}</span></div>
        </div>
      </div>
    </article>

    <div class="labStudies">
      <article class="labText">
        <p class="meta labIndex">{{ t('02 / CAPAS Y MATERIAL', '02 / LAYERS AND MATERIAL') }}</p>
        <h3>{{ t('Vidrio detrás del símbolo.', 'Glass behind the symbol.') }}</h3>
        <p>{{ t('Los planos rectos y translúcidos dan profundidad y contrastan con la silueta orgánica. Separé el plano de vidrio de la capa de partículas para que el símbolo conserve sus bordes al cruzarlo.', 'Straight, translucent planes add depth and contrast with the organic silhouette. I put the glass and particles on separate layers so the symbol keeps its definition as it crosses the glass.') }}</p>
        <a class="projectBack iconLink" href="#inicio">{{ t('Ver las capas en la apertura', 'See the layers in the hero') }} <SiteIcon name="up" /></a>
      </article>
      <article class="labText">
        <p class="meta labIndex">{{ t('03 / RITMO Y RECORRIDO', '03 / RHYTHM AND NAVIGATION') }}</p>
        <h3>{{ t('Una galería en diagonal.', 'A gallery on the diagonal.') }}</h3>
        <p>{{ t('Probé cambios de altura y ángulo para que cada proyecto entre en escena por separado. En escritorio, ScrollTrigger transforma parte del scroll vertical en un recorrido lateral. En celular, las tarjetas se deslizan con el dedo y la página sigue bajando con normalidad.', 'I varied the height and angle of each card so projects enter the scene one at a time. On desktop, ScrollTrigger turns part of the vertical scroll into sideways movement. On mobile, you can swipe the cards while the page keeps its natural vertical scroll.') }}</p>
        <a class="projectBack iconLink" href="#proyectos">{{ t('Recorrer la galería', 'Explore the gallery') }} <SiteIcon name="up" /></a>
      </article>
      <article class="labText">
        <p class="meta labIndex">{{ t('04 / JERARQUÍA TIPOGRÁFICA', '04 / TYPOGRAPHIC HIERARCHY') }}</p>
        <h3>{{ t('Tres líneas, tres pausas.', 'Three lines, three pauses.') }}</h3>
        <p>{{ t('En «Las ideas toman forma», cada línea marca una pausa y el terracota destaca el verbo. El descriptor y los enlaces recuperan una escala más chica. Así se puede leer primero la idea, después quién soy y por dónde seguir.', 'In “Ideas take shape,” each line creates a pause and terracotta highlights the verb. The smaller descriptor and links let the idea lead, followed by who I am and where to go next.') }}</p>
        <a class="projectBack iconLink" href="#inicio">{{ t('Leer la apertura', 'Read the opening') }} <SiteIcon name="up" /></a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { sampleMonogramMask } from '~/utils/monogramMask'

type Dot = { fromX: number; fromY: number; toX: number; toY: number; radius: number }
const dots = shallowRef<Dot[]>([])
const progress = ref(80)
const { t } = usePortfolioLocale()
const sitePath = useSitePath()
const phases = computed(() => [t('Dispersión', 'Scatter'), t('Encuentro', 'Converge'), t('Forma', 'Form')])
const phase = computed(() => {
  if (progress.value < 25) return phases.value[0]
  if (progress.value < 92) return phases.value[1]
  return phases.value[2]
})
const eased = computed(() => {
  const fraction = progress.value / 100
  return fraction * fraction * (3 - 2 * fraction)
})

function createDots(image: HTMLImageElement) {
  const samples = sampleMonogramMask(image)
  if (!samples.length) return

  const scale = Math.min(310 / image.naturalWidth, 165 / image.naturalHeight)
  const count = 440
  dots.value = Array.from({ length: count }, (_, index) => {
    const angle = index * 2.399963
    const radius = Math.sqrt((index + 0.5) / count)
    const [x, y] = samples[Math.floor(((index * 0.618034) % 1) * samples.length)]!
    return {
      fromX: 240 + Math.cos(angle) * radius * 208,
      fromY: 130 + Math.sin(angle) * radius * 104,
      toX: 240 + (x - image.naturalWidth / 2) * scale,
      toY: 130 + (y - image.naturalHeight / 2) * scale,
      radius: index % 9 === 0 ? 2.1 : 1.45,
    }
  })
}

onMounted(async () => {
  const image = document.querySelector<HTMLImageElement>('#maskImage')
  if (!image) return
  try {
    await image.decode()
    createDots(image)
  } catch {
    // The static monogram remains visible if the image cannot be sampled.
  }
})
</script>
