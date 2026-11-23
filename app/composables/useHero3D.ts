import { sampleMonogramMask } from '~/utils/monogramMask'

const vertexShader = `
  attribute vec3 aTarget;
  attribute float aSize;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  uniform float uPointScale;
  uniform float uCameraDepth;
  uniform vec2 uPointer;
  varying float vSeed;

  void main() {
    float convergence = smoothstep(0., 1., uProgress);
    float drift = 1. - convergence;
    float phase = aSeed * 6.28318;
    vec3 start = position;
    start.x += sin(uTime * .75 + phase * 3.) * .34 * drift;
    start.y += cos(uTime * .6 + phase * 2.3) * .27 * drift;
    vec3 point = mix(start, aTarget, convergence);

    vec2 delta = point.xy - uPointer;
    float distanceSquared = dot(delta, delta);
    float repel = exp(-distanceSquared * .48) * (.12 + .30 * drift);
    point.xy += normalize(delta + vec2(.001)) * repel;
    point.z += sin(uTime * .65 + phase) * .09 * drift;

    vec4 view = modelViewMatrix * vec4(point, 1.);
    gl_Position = projectionMatrix * view;
    gl_PointSize = clamp(aSize * uPointScale * uCameraDepth / -view.z, 1.5, 15.);
    vSeed = aSeed;
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uProgress;
  varying float vSeed;

  void main() {
    float radius = distance(gl_PointCoord, vec2(.5));
    float alpha = 1. - smoothstep(.28, .5, radius);
    if (alpha < .02) discard;
    vec3 color = mix(uColor, uAccent, step(.90, vSeed) * .76);
    gl_FragColor = vec4(color, alpha * (.72 + uProgress * .28));
    #include <colorspace_fragment>
  }
`

export function startHero3D(): () => void {
  const stage = document.querySelector<HTMLElement>('#webglStage')
  const image = document.querySelector<HTMLImageElement>('#maskImage')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!stage || !image || reducedMotion.matches) return () => {}

  const compact = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches
  let ended = false
  let cleanup: (() => void) | undefined

  async function mountParticles(stage: HTMLElement, mask: HTMLImageElement) {
    const [THREE] = await Promise.all([import('three'), mask.decode()])
    if (ended) return
    const samples = sampleMonogramMask(mask)
    if (!samples.length) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.25 : 1.7))
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    stage.append(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100)
    const viewSlope = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    const uniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uPointScale: { value: 1 },
      uCameraDepth: { value: 1 },
      uPointer: { value: new THREE.Vector2(100, 100) },
      uColor: { value: new THREE.Color() },
      uAccent: { value: new THREE.Color() },
    }

    const count = compact ? 2000 : 4200
    const positions = new Float32Array(count * 3)
    const targets = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const seeds = new Float32Array(count)
    const scale = 5.2 / Math.max(mask.naturalWidth, mask.naturalHeight)
    const width = mask.naturalWidth * scale
    const height = mask.naturalHeight * scale

    for (let index = 0; index < count; index++) {
      const [x, y] = samples[Math.floor(Math.random() * samples.length)]!
      const angle = Math.random() * Math.PI * 2
      const radius = Math.sqrt(Math.random()) * 4.8
      const offset = index * 3

      positions[offset] = Math.cos(angle) * radius
      positions[offset + 1] = Math.sin(angle) * radius
      positions[offset + 2] = (Math.random() - .5) * 3.2
      targets[offset] = x * scale - width / 2
      targets[offset + 1] = height / 2 - y * scale
      targets[offset + 2] = (Math.random() - .5) * .17
      sizes[index] = .46 + Math.pow(Math.random(), 2.5) * 1.16
      seeds[index] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms,
    })
    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    scene.add(points)

    function resize() {
      const { clientWidth, clientHeight } = stage
      if (!clientWidth || !clientHeight) return

      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.position.z = Math.max(width / (.84 * camera.aspect), height / .74) / (2 * viewSlope)
      camera.updateProjectionMatrix()
      uniforms.uCameraDepth.value = camera.position.z
      uniforms.uPointScale.value = THREE.MathUtils.clamp(clientWidth * .0086, 3.5, 7) * renderer.getPixelRatio()
    }

    function applyColors() {
      const dark = document.body.classList.contains('dark')
      uniforms.uColor.value.set(dark ? '#F8F7F2' : '#251D1B')
      uniforms.uAccent.value.set(dark ? '#AE92FF' : '#6B5CE7')
    }

    function movePointer(event: PointerEvent) {
      if (event.pointerType === 'touch') return
      const bounds = stage.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1
      const y = (event.clientY - bounds.top) / bounds.height * 2 - 1
      if (Math.abs(x) > 1 || Math.abs(y) > 1) {
        uniforms.uPointer.value.set(100, 100)
        return
      }

      const halfHeight = camera.position.z * viewSlope
      uniforms.uPointer.value.set(x * halfHeight * camera.aspect, -y * halfHeight)
    }

    let inView = false
    let frame = 0
    let startedAt: number | undefined

    function scheduleFrame() {
      if (!frame && inView && !document.hidden && !canvas.hasAttribute('data-context-lost')) {
        frame = requestAnimationFrame(draw)
      }
    }

    function draw(now: number) {
      frame = 0
      startedAt ??= now
      const elapsed = (now - startedAt) / 1000
      const progress = THREE.MathUtils.clamp((elapsed - (compact ? .18 : .8)) / (compact ? 2.6 : 4.8), 0, 1)
      uniforms.uTime.value = elapsed
      uniforms.uProgress.value = progress * progress * (3 - 2 * progress)
      points.rotation.z = Math.sin(elapsed * .15) * .018
      points.rotation.y = Math.sin(elapsed * .3) * .035
      renderer.render(scene, camera)
      if (!stage.hasAttribute('data-particles-ready')) stage.setAttribute('data-particles-ready', '')
      scheduleFrame()
    }

    function updateVisibility() {
      if (inView && !document.hidden) {
        scheduleFrame()
      } else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const listeners = new AbortController()
    const { signal } = listeners
    window.addEventListener('pointermove', movePointer, { signal, passive: true })
    window.addEventListener('brand-theme-change', applyColors, { signal })
    document.addEventListener('visibilitychange', updateVisibility, { signal })
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      canvas.setAttribute('data-context-lost', '')
      stage.removeAttribute('data-particles-ready')
      cancelAnimationFrame(frame)
      frame = 0
    }, { signal })
    canvas.addEventListener('webglcontextrestored', () => {
      canvas.removeAttribute('data-context-lost')
      scheduleFrame()
    }, { signal })

    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting)
      updateVisibility()
    })
    const resizeObserver = new ResizeObserver(resize)
    resize()
    applyColors()
    observer.observe(stage)
    resizeObserver.observe(stage)

    cleanup = () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      listeners.abort()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      canvas.remove()
      stage.removeAttribute('data-particles-ready')
    }
  }

  void mountParticles(stage, image).catch(() => {
    cleanup?.()
    stage.querySelector('canvas')?.remove()
    stage.removeAttribute('data-particles-ready')
  })

  return () => {
    ended = true
    cleanup?.()
  }
}
