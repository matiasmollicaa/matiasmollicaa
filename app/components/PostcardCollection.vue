<template>
  <section class="postcardCollection" aria-labelledby="postcard-heading">
    <header class="projectSectionHeader">
      <p class="meta">{{ t('TRES POSTALES / UN CONCEPTO', 'THREE POSTCARDS / ONE CONCEPT') }}</p>
      <h2 id="postcard-heading">{{ t('Las letras también cuentan ciclos.', 'Letterforms tell stories of cycles.') }}</h2>
      <p>{{ t('Elegí una postal para explorarla. Tocala para girarla y descubrir su dorso, o ampliá la imagen para ver los detalles.', 'Choose a postcard to explore. Tap it to turn it over and discover the back, or enlarge the image to see the details.') }}</p>
    </header>

    <div class="postcardChoices" role="group" :aria-label="t('Elegir una postal', 'Choose a postcard')">
      <button
        v-for="(postcard, index) in postcards"
        :key="postcard.id"
        type="button"
        class="postcardChoice"
        :class="{ selected: index === selected }"
        :aria-pressed="index === selected"
        aria-controls="postcard-workspace"
        @click="select(index)"
      >
        <img :src="sitePath(postcard.front.src)" width="100" height="71" alt="" loading="lazy" />
        <span><small>0{{ index + 1 }}</small><strong>{{ postcard.typeface }}</strong></span>
      </button>
    </div>

    <div id="postcard-workspace" class="postcardWorkspace">
      <div class="postcardScene" @pointermove="tilt" @pointerleave="resetTilt">
        <div class="postcardSceneMeta meta">
          <span>{{ t('POSTAL', 'POSTCARD') }} 0{{ selected + 1 }} / 0{{ postcards.length }}</span>
          <span>{{ flipped ? t('DORSO', 'BACK') : t('FRENTE', 'FRONT') }}</span>
        </div>
        <div class="postcardSpace">
          <div :key="current.id" class="postcardTilt" :style="{ '--tilt-x': tiltX + 'deg', '--tilt-y': tiltY + 'deg' }">
            <button
              type="button"
              class="postcardObject"
              :class="{ flipped }"
              :aria-pressed="flipped"
              :aria-label="t(`Girar postal de ${current.typeface}. Mostrando ${flipped ? 'dorso' : 'frente'}.`, `Turn the ${current.typeface} postcard. Showing the ${flipped ? 'back' : 'front'}.`)"
              @click="flipped = !flipped"
            >
              <span class="postcardFace postcardFront" :aria-hidden="flipped">
                <img :src="sitePath(current.front.src)" :width="current.front.width" :height="current.front.height" :alt="current.front.alt" draggable="false" />
              </span>
              <span class="postcardFace postcardBack" :aria-hidden="!flipped">
                <img :src="sitePath(current.back.src)" :width="current.back.width" :height="current.back.height" :alt="current.back.alt" draggable="false" />
              </span>
            </button>
          </div>
        </div>
        <div class="postcardActions">
          <button type="button" class="postcardAction" :aria-pressed="flipped" @click="flipped = !flipped">
            <SiteIcon name="rotate" /> {{ flipped ? t('Ver frente', 'View front') : t('Ver dorso', 'View back') }}
          </button>
          <button type="button" class="postcardAction" aria-haspopup="dialog" :aria-label="t(`Ampliar ${shownImage.caption}`, `Enlarge ${shownImage.caption}`)" @click="emit('enlarge', shownImage.src, $event)">
            <SiteIcon name="expand" /> {{ t('Ampliar', 'Enlarge') }}
          </button>
        </div>
      </div>

      <article class="postcardNote">
        <p class="meta postcardTypeface">{{ current.typeface }}</p>
        <h3>{{ current.theme }}</h3>
        <h4>{{ t('La elección tipográfica', 'The typeface choice') }}</h4>
        <p>{{ current.choice }}</p>
        <h4>{{ t('La representación', 'The composition') }}</h4>
        <p>{{ current.interpretation }}</p>
        <p class="postcardCredit">{{ t('Diseño de la tipografía', 'Typeface designers') }}<br /><span>{{ current.credits }}</span></p>
      </article>
    </div>

    <footer class="postcardFooter">
      <span>{{ t('Frentes y dorsos originales de la entrega.', 'Original fronts and backs from the submitted project.') }}</span>
      <div class="postcardNavigation" role="group" :aria-label="t('Recorrer las postales', 'Browse postcards')">
        <button type="button" :aria-label="t('Postal anterior', 'Previous postcard')" @click="move(-1)"><SiteIcon name="left" /></button>
        <span aria-hidden="true">0{{ selected + 1 }} / 0{{ postcards.length }}</span>
        <button type="button" :aria-label="t('Postal siguiente', 'Next postcard')" @click="move(1)"><SiteIcon name="right" /></button>
      </div>
    </footer>
    <p class="postcardAnnounce" role="status">{{ current.typeface }}. {{ current.theme }}. {{ flipped ? t('Dorso', 'Back') : t('Frente', 'Front') }}.</p>
  </section>
</template>

<script setup lang="ts">
import type { Postcard } from '~/data/cicloPostcards'

const props = defineProps<{ postcards: Postcard[] }>()
const emit = defineEmits<{ enlarge: [src: string, event: MouseEvent] }>()
const { t } = usePortfolioLocale()
const sitePath = useSitePath()
const selected = ref(0)
const flipped = ref(false)
const tiltX = ref(0)
const tiltY = ref(0)
const current = computed(() => props.postcards[selected.value]!)
const shownImage = computed(() => flipped.value ? current.value.back : current.value.front)

function resetTilt() {
  tiltX.value = 0
  tiltY.value = 0
}

function select(index: number) {
  if (index === selected.value) return
  selected.value = index
  flipped.value = false
  resetTilt()
}

function move(direction: -1 | 1) {
  select((selected.value + direction + props.postcards.length) % props.postcards.length)
}

function tilt(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tiltX.value = -(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 7
  tiltY.value = (event.clientX - bounds.left - bounds.width / 2) / bounds.width * 9
}
</script>

<style scoped>
.postcardCollection { margin-top: clamp(45px, 7vw, 90px); }
.postcardCollection > .projectSectionHeader { max-width: 780px; }
.postcardCollection > .projectSectionHeader > .meta { color: var(--sub); font-size: 11px; margin-bottom: 18px; }
.postcardChoices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 30px 0 20px; }
.postcardChoice {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 13px;
  text-align: start;
  color: var(--sub);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 3px;
  cursor: pointer;
  transition: border-color .2s, background-color .2s, color .2s;
}
.postcardChoice.selected { color: var(--ink); border-color: var(--focus-ring); background: var(--glass); }
.postcardChoice:hover { color: var(--ink); }
.postcardChoice img { width: clamp(42px, 5vw, 78px); height: auto; border: 1px solid #ffffff30; }
.postcardChoice span { display: flex; flex-direction: column; gap: 5px; }
.postcardChoice small { font-size: 10px; color: var(--sub); }
.postcardChoice strong { font-size: clamp(12px, 1.3vw, 16px); font-weight: 600; }
.postcardWorkspace { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: clamp(25px, 4vw, 60px); align-items: start; }
.postcardScene {
  position: relative;
  min-width: 0;
  padding: clamp(16px, 2vw, 28px);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 4px;
  background-color: var(--surface);
  background-image: radial-gradient(ellipse at 45% 40%, #81b89e15, transparent 68%), radial-gradient(var(--line) .65px, transparent .65px);
  background-size: auto, 18px 18px;
}
.postcardSceneMeta { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; color: var(--sub); font-size: 10px; }
.postcardSpace { position: relative; display: grid; align-items: center; min-height: clamp(235px, 30vw, 420px); padding: 28px 0 36px; perspective: 1300px; }
.postcardTilt {
  width: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) rotateZ(-3deg);
  transition: transform .25s ease-out;
}
.postcardObject {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 2000 / 1414;
  padding: 0;
  border: 0;
  border-radius: 1px;
  background: transparent;
  color: var(--ink);
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform .85s cubic-bezier(.25, .65, .2, 1);
  cursor: pointer;
}
.postcardObject.flipped { transform: rotateY(180deg); }
.postcardFace {
  position: absolute;
  inset: 0;
  display: block;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: white;
  box-shadow: 0 1px 2px #0004, 0 12px 20px -8px #0004, 0 30px 45px -17px #0007;
}
.postcardFront { transform: translateZ(.5px); }
.postcardBack { transform: rotateY(180deg) translateZ(.5px); }
.postcardFace img { display: block; width: 100%; height: 100%; object-fit: contain; border-radius: 1px; }
.postcardActions { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.postcardAction {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 9px 13px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 99px;
  font-size: 12px;
  cursor: pointer;
  --icon-size: 17px;
}
.postcardAction:hover { border-color: var(--focus-ring); }
.postcardNote { padding-top: 8px; }
.postcardTypeface { color: var(--focus-ring); font-size: 11px; margin: 0 0 10px; }
.postcardNote h3 { font-family: Basteleur, Georgia, serif; font-size: clamp(33px, 4vw, 55px); font-weight: 400; letter-spacing: -.045em; line-height: 1.06; margin: 0 0 25px; }
.postcardNote h4 { font-size: 13px; margin: 20px 0 7px; }
.postcardNote > p:not(.meta) { font-size: clamp(14px, 1.3vw, 17px); line-height: 1.65; color: var(--sub); margin: 0; }
.postcardNote > p.postcardCredit { margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 11px; line-height: 1.65; }
.postcardCredit span { color: var(--ink); }
.postcardFooter { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 18px; margin-top: 25px; padding-top: 18px; border-top: 1px solid var(--line); color: var(--sub); font-size: 12px; }
.postcardNavigation { display: flex; align-items: center; gap: 15px; }
.postcardNavigation button { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid var(--line); background: var(--surface); color: var(--ink); border-radius: 50%; cursor: pointer; --icon-size: 21px; }
.postcardNavigation button:hover { color: #251d1b; background: var(--lime); }
.postcardAnnounce { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 900px) {
  .postcardWorkspace { grid-template-columns: 1fr; }
  .postcardSpace { min-height: 0; padding: 45px 8px; }
  .postcardTilt { width: min(100%, 600px); margin-inline: auto; }
  .postcardNote { max-width: 65ch; }
}
@media (max-width: 540px) {
  .postcardChoices { gap: 8px; }
  .postcardChoice { flex-direction: column; align-items: start; padding: 10px 8px; gap: 8px; }
  .postcardChoice img { width: 100%; }
  .postcardChoice span { gap: 4px; }
  .postcardChoice strong { font-size: 12px; line-height: 1.3; }
  .postcardSpace { padding: 32px 2px; }
  .postcardAction { padding-inline: 10px; font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .postcardTilt { transform: none; transition: none; }
  .postcardObject { transition: none; }
}
</style>
