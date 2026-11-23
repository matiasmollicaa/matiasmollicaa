<template>
  <div ref="sculpture" class="conceptSculpture" aria-hidden="true" @pointermove="move" @pointerleave="reset">
    <div class="conceptHalo"></div>
    <div class="conceptCoordinates"><i></i><i></i><i></i><i></i></div>
    <div class="conceptObject" :style="{ '--concept-x': pointerX + 'deg', '--concept-y': pointerY + 'deg' }">
      <svg viewBox="0 0 640 430" fill="none" class="conceptArtwork">
        <ellipse cx="320" cy="355" rx="138" ry="12" fill="currentColor" class="conceptShadow" />
        <g class="conceptRibbon">
          <polygon
            v-for="(face, index) in faces"
            :key="index"
            :points="face.points"
            :fill="face.wire ? 'var(--concept-mesh-fill)' : face.color"
            :stroke="face.wire ? 'var(--concept-mesh-line)' : face.color"
            stroke-width=".65"
            :fill-opacity="face.wire ? .14 : 1"
            :stroke-opacity="face.wire ? .75 : 1"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>
    <div class="conceptLegend meta">
      <span>{{ t('EXPRESIÓN', 'EXPRESSION') }}</span>
      <span class="conceptConnection"><i></i><b></b><i></i></span>
      <span>{{ t('ESTRUCTURA', 'STRUCTURE') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = usePortfolioLocale()
const sculpture = useTemplateRef<HTMLElement>('sculpture')
const pointerX = ref(0)
const pointerY = ref(0)

type Point = { x: number; y: number; z: number }
type Face = { points: string; color: string; depth: number; wire: boolean }

function point(u: number, v: number): Point {
  const radius = 142 + v * Math.cos(u / 2)
  const x = radius * Math.cos(u)
  const y = radius * Math.sin(u)
  const z = v * Math.sin(u / 2)
  const tilt = 1.02
  const yaw = -.26
  const turn = -.4
  const y1 = y * Math.cos(tilt) - z * Math.sin(tilt)
  const z1 = y * Math.sin(tilt) + z * Math.cos(tilt)
  const x2 = x * Math.cos(yaw) + z1 * Math.sin(yaw)
  const z2 = -x * Math.sin(yaw) + z1 * Math.cos(yaw)
  return { x: x2 * Math.cos(turn) - y1 * Math.sin(turn), y: x2 * Math.sin(turn) + y1 * Math.cos(turn), z: z2 }
}

function project(p: Point) {
  const perspective = 860 / (860 - p.z)
  return `${(320 + p.x * perspective).toFixed(2)},${(205 + p.y * perspective).toFixed(2)}`
}

const faces: Face[] = []
const segments = 96
const lanes = 9
for (let i = 0; i < segments; i++) {
  const u = i / segments * Math.PI * 2
  const nextU = (i + 1) / segments * Math.PI * 2
  for (let j = 0; j < lanes; j++) {
    const v = -64 + j / lanes * 128
    const nextV = -64 + (j + 1) / lanes * 128
    const vertices = [point(u, v), point(nextU, v), point(nextU, nextV), point(u, nextV)]
    const a = vertices[0]!
    const b = vertices[1]!
    const d = vertices[3]!
    const du = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z }
    const dv = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z }
    const normal = { x: du.y * dv.z - du.z * dv.y, y: du.z * dv.x - du.x * dv.z, z: du.x * dv.y - du.y * dv.x }
    const length = Math.hypot(normal.x, normal.y, normal.z) || 1
    const light = Math.abs((-.35 * normal.x - .65 * normal.y + .68 * normal.z) / length)
    const highlight = Math.pow(light, 7)
    const lightness = 33 + light * 28 + highlight * 14
    faces.push({
      points: vertices.map(project).join(' '),
      color: `hsl(${(257 + Math.sin(u) * 9).toFixed(2)} 67% ${lightness.toFixed(2)}%)`,
      depth: Number((vertices.reduce((sum, vertex) => sum + vertex.z, 0) / vertices.length).toFixed(6)),
      wire: Math.cos(u + Math.PI / segments) > .13,
    })
  }
}
faces.sort((a, b) => a.depth - b.depth)

function reset() {
  pointerX.value = 0
  pointerY.value = 0
}

function move(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
  const bounds = sculpture.value!.getBoundingClientRect()
  pointerX.value = -(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 10
  pointerY.value = (event.clientX - bounds.left - bounds.width / 2) / bounds.width * 13
}

let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(entries => {
    sculpture.value?.classList.toggle('isInView', Boolean(entries[0]?.isIntersecting))
  }, { threshold: .15 })
  if (sculpture.value) observer.observe(sculpture.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.conceptSculpture {
  --concept-mesh-line: #c56e4e;
  --concept-mesh-fill: #6b5ce7;
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 640px;
  margin-top: 12px;
  padding-bottom: 12px;
  perspective: 1000px;
}
:global(html[data-portfolio-theme='dark']) .conceptSculpture { --concept-mesh-line: #efb195; }
.conceptHalo {
  position: absolute;
  z-index: -1;
  inset: 10% 3% 15%;
  background: radial-gradient(ellipse at 35% 45%, #6b5ce724, transparent 62%), radial-gradient(ellipse at 75% 60%, #d9744e15, transparent 62%);
}
.conceptCoordinates { position: absolute; inset: 16% 0 17%; pointer-events: none; }
.conceptCoordinates i { position: absolute; width: 10px; height: 10px; border-color: var(--line); border-style: solid; border-width: 1px 0 0 1px; }
.conceptCoordinates i:nth-child(1) { top: 0; left: 0; }
.conceptCoordinates i:nth-child(2) { top: 0; right: 0; transform: rotate(90deg); }
.conceptCoordinates i:nth-child(3) { bottom: 0; right: 0; transform: rotate(180deg); }
.conceptCoordinates i:nth-child(4) { bottom: 0; left: 0; transform: rotate(270deg); }
.conceptObject { transform: rotateX(var(--concept-x)) rotateY(var(--concept-y)); transition: transform .4s ease-out; }
.conceptArtwork { display: block; width: 100%; height: auto; overflow: visible; }
.conceptShadow { opacity: .09; filter: blur(9px); }
.conceptRibbon { transform-origin: 320px 205px; animation: conceptBreathe 9s ease-in-out infinite; animation-play-state: paused; filter: drop-shadow(0 17px 12px #18102026); }
.isInView .conceptRibbon { animation-play-state: running; }
.conceptLegend { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-top: 6px; color: var(--sub); font-size: 10px; }
.conceptConnection { display: flex; align-items: center; gap: 9px; flex: 1; max-width: 130px; }
.conceptConnection i { height: 1px; flex: 1; background: var(--line); }
.conceptConnection b { width: 6px; height: 6px; border: 1px solid var(--terracotta); transform: rotate(45deg); }
@keyframes conceptBreathe {
  0%, 100% { transform: translateY(3px) rotate(-2deg); }
  50% { transform: translateY(-5px) rotate(2deg); }
}
@media (max-width: 700px) {
  .conceptSculpture { max-width: 500px; margin: 8px auto 0; }
  .conceptLegend { font-size: 9px; letter-spacing: .15em; }
}
@media (prefers-reduced-motion: reduce) {
  .conceptRibbon { animation: none; }
  .conceptObject { transform: none; transition: none; }
}
</style>
