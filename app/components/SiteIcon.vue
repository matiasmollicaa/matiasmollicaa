<template>
  <svg
    class="siteIcon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-if="arrowAngle !== undefined" d="M4.5 12h14m-5-5 5 5-5 5" :transform="`rotate(${arrowAngle} 12 12)`" />
    <template v-else-if="name === 'theme'">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none" />
    </template>
    <path v-else :d="paths[name]" />
  </svg>
</template>

<script setup lang="ts">
const arrowAngles = { right: 0, down: 90, left: 180, up: 270, diagonal: 315 } as const
const paths: Record<string, string> = {
  close: 'm6 6 12 12M18 6 6 18',
  menu: 'M3.5 9h17M7.5 15h13',
  expand: 'M13.5 5H19v5.5M19 5l-5.5 5.5M10.5 19H5v-5.5M5 19l5.5-5.5',
  rotate: 'M20 4v6h-6M20 10a8 8 0 1 0 0 6',
}

const { name } = defineProps<{ name: keyof typeof arrowAngles | 'close' | 'menu' | 'expand' | 'theme' | 'rotate' }>()
const arrowAngle = computed(() => arrowAngles[name as keyof typeof arrowAngles])
</script>

<style scoped>
.siteIcon {
  display: block;
  flex: none;
  width: var(--icon-size, 1.15em);
  height: var(--icon-size, 1.15em);
}
</style>
