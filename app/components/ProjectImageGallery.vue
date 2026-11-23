<template>
  <dialog
    ref="dialog"
    class="projectViewer"
    :class="{ 'projectViewer--visible': visible }"
    :aria-label="t(`Galería de ${projectName}`, `${projectName} image gallery`)"
    @cancel.prevent="visible = false"
    @close="restoreFocus"
    @pointerdown="startedOutside = $event.target === $event.currentTarget"
    @click.self="closeFromBackdrop"
    @keydown.left.stop.prevent="navigate(-1)"
    @keydown.right.stop.prevent="navigate(1)"
  >
    <Transition name="viewer" @after-leave="dialog?.close()">
      <div v-if="visible && image" class="viewerPanel">
        <header class="viewerHeader">
          <span class="meta">{{ projectName }}</span>
          <button ref="closeButton" type="button" class="viewerClose" :aria-label="t('Cerrar galería', 'Close gallery')" @click="visible = false">
            <span>{{ t('Cerrar', 'Close') }}</span><SiteIcon name="close" />
          </button>
        </header>

        <div
          class="viewerStage"
          @pointerdown="startSwipe"
          @pointerup="finishSwipe"
          @pointercancel="swipe = undefined"
        >
          <Transition :name="direction > 0 ? 'image-next' : 'image-previous'">
            <img
              :key="image.src"
              :src="sitePath(image.src)"
              :width="image.width"
              :height="image.height"
              :alt="image.alt"
              draggable="false"
            />
          </Transition>
        </div>

        <footer class="viewerFooter">
          <div class="viewerCaption" aria-live="polite" aria-atomic="true">
            <span>{{ index + 1 }} / {{ images.length }}</span>
            <strong>{{ image.caption }}</strong>
          </div>
          <div v-if="images.length > 1" class="viewerNavigation" role="group" :aria-label="t('Recorrer imágenes', 'Browse images')">
            <button type="button" :aria-label="t('Imagen anterior', 'Previous image')" @click="navigate(-1)"><SiteIcon name="left" /></button>
            <button type="button" :aria-label="t('Imagen siguiente', 'Next image')" @click="navigate(1)"><SiteIcon name="right" /></button>
          </div>
        </footer>
      </div>
    </Transition>
  </dialog>
</template>

<script setup lang="ts">
import type { ImageMedia } from '~/data/projects'

const props = defineProps<{ images: ImageMedia[]; projectName: string }>()
const { t } = usePortfolioLocale()
const sitePath = useSitePath()
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const visible = ref(false)
const index = ref(0)
const direction = ref(1)
const image = computed(() => props.images[index.value])
let opener: HTMLElement | undefined
let startedOutside = false
let swipe: { id: number; x: number; y: number } | undefined

function open(imageIndex: number, trigger: HTMLElement) {
  const viewer = dialog.value
  if (!viewer || viewer.open || !props.images[imageIndex]) return

  index.value = imageIndex
  opener = trigger
  viewer.showModal()
  visible.value = true
  void nextTick(() => closeButton.value?.focus({ preventScroll: true }))
}

function closeFromBackdrop() {
  if (startedOutside) visible.value = false
}

function restoreFocus() {
  visible.value = false
  startedOutside = false
  swipe = undefined
  opener?.focus({ preventScroll: true })
  opener = undefined
}

function navigate(step: -1 | 1) {
  const count = props.images.length
  if (!visible.value || count < 2) return

  direction.value = step
  index.value = (index.value + step + count) % count
}

function startSwipe(event: PointerEvent) {
  if (event.pointerType !== 'touch' || !event.isPrimary) return
  swipe = { id: event.pointerId, x: event.clientX, y: event.clientY }
}

function finishSwipe(event: PointerEvent) {
  if (swipe?.id !== event.pointerId) return

  const deltaX = event.clientX - swipe.x
  const deltaY = event.clientY - swipe.y
  swipe = undefined
  if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) navigate(deltaX < 0 ? 1 : -1)
}

onBeforeUnmount(() => dialog.value?.close())
defineExpose({ open })
</script>

<style scoped>
:global(html:has(.projectViewer)) {
  scrollbar-gutter: stable;
}

:global(html:has(.projectViewer[open])) {
  overflow: hidden;
}

.projectViewer {
  --viewer-gutter: clamp(10px, 4vmin, 32px);
  position: fixed;
  inset: 0;
  width: min(1080px, calc(100% - 2 * var(--viewer-gutter)));
  height: fit-content;
  max-width: none;
  max-height: none;
  margin: auto;
  padding: 0;
  overflow: visible;
  border: 0;
  background: transparent;
  color: var(--ink);
}

.projectViewer::backdrop {
  background: #120e17c9;
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity .24s ease;
}

.projectViewer--visible::backdrop {
  opacity: 1;
}

.viewerPanel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 12px;
  height: min(880px, calc(100dvh - 2 * var(--viewer-gutter)));
  padding: clamp(12px, 2.5vw, 26px);
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 30px 100px #0d091766;
}

.viewerHeader, .viewerFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.viewerHeader .meta { color: var(--sub); }

.viewerStage {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-radius: 6px;
  background: var(--paper);
  touch-action: pan-y pinch-zoom;
}

.viewerStage img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.viewerCaption {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 14px;
  font-size: 14px;
  line-height: 1.35;
}

.viewerCaption span {
  color: var(--sub);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.viewerNavigation { display: flex; flex-shrink: 0; gap: 8px; }

.viewerHeader button, .viewerNavigation button {
  display: inline-flex;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
}

.viewerHeader button { gap: 9px; padding: 0 13px; font-size: 13px; }
.viewerClose { --icon-size: 17px; }
.viewerNavigation button { --icon-size: 22px; }
.viewerHeader button:is(:hover, :focus-visible),
.viewerNavigation button:is(:hover, :focus-visible) { background: var(--lime); color: #251d1b; }

.viewer-enter-active, .viewer-leave-active {
  transition: opacity .24s ease, transform .3s cubic-bezier(.22, 1, .36, 1);
}

.viewer-enter-from, .viewer-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(.965);
}

.image-next-enter-active, .image-next-leave-active,
.image-previous-enter-active, .image-previous-leave-active {
  transition: opacity .2s ease, transform .26s cubic-bezier(.22, 1, .36, 1);
}

.image-next-enter-from, .image-previous-leave-to { opacity: 0; transform: translateX(24px); }
.image-previous-enter-from, .image-next-leave-to { opacity: 0; transform: translateX(-24px); }

@media (max-width: 540px) {
  .viewerPanel { height: min(76dvh, calc(113vw + 100px)); }
  .viewerCaption { font-size: 12px; }
}
</style>
