/** GSAP/ScrollTrigger + Lenis. Separate from Three.js for graceful degradation. */
export async function startMotion(): Promise<() => void> {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return () => {}

  const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'), import('gsap/ScrollTrigger'), import('lenis'),
  ])
  gsap.registerPlugin(ScrollTrigger)
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.15, anchors: true })
  let raf = 0
  const animate = (time: number) => {
    lenis.raf(time)
    raf = window.requestAnimationFrame(animate)
  }
  raf = requestAnimationFrame(animate)
  lenis.on('scroll', ScrollTrigger.update)

  const responsive = gsap.matchMedia()
  responsive.add('(min-width: 960px) and (min-height: 680px) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
    const gallery = document.querySelector<HTMLElement>('.projectGallery')
    const presentation = gallery?.querySelector<HTMLElement>('.projectPresentation')
    const stage = document.querySelector<HTMLElement>('.projectStage')
    const track = stage?.querySelector<HTMLElement>('.projectTrack')
    if (!gallery || !presentation || !stage || !track) return

    const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth)
    const pinTop = () => (document.querySelector('.nav')?.getBoundingClientRect().height ?? 82) + 22
    gallery.classList.add('projectGallery--pinned')
    stage.classList.add('projectStage--pinned')
    stage.scrollLeft = 0

    function fitGallery() {
      if (!gallery || !presentation || !stage || !track) return
      const height = window.innerHeight - pinTop() - 22
      gallery.style.setProperty('--gallery-height', `${height}px`)
      const headingHeight = [...presentation.querySelectorAll<HTMLElement>(':scope > .sectionLabel, :scope > .projectsHead')]
        .reduce((sum, element) => sum + element.offsetHeight + parseFloat(getComputedStyle(element).marginBottom), 0)
      const cardBody = Math.max(...[...track.querySelectorAll<HTMLElement>('.projectCardBody')].map(body => body.offsetHeight))
      const width = Math.max(240, Math.min(490, stage.clientWidth * .4, (height - headingHeight - cardBody - 100) * 1.6))
      gallery.style.setProperty('--gallery-card-width', `${width}px`)
    }

    fitGallery()
    ScrollTrigger.addEventListener('refreshInit', fitGallery)
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: presentation,
        start: () => `top ${pinTop()}px`,
        end: () => `+=${Math.max(distance(), window.innerHeight * 1.1)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    function revealFocusedCard(event: FocusEvent) {
      const trigger = tween.scrollTrigger
      const card = (event.target as HTMLElement).closest('.projectCard')
      if (!trigger || !card || !stage) return

      const frame = stage.getBoundingClientRect()
      const target = card.getBoundingClientRect()
      if (target.left >= frame.left && target.right <= frame.right) return

      const centered = target.left + target.width / 2 - (frame.left + frame.width / 2)
      const offset = gsap.utils.clamp(0, distance(), trigger.progress * distance() + centered)
      const progress = distance() ? offset / distance() : 0
      lenis.scrollTo(trigger.start + progress * (trigger.end - trigger.start), { immediate: true })
    }

    stage.addEventListener('focusin', revealFocusedCard)
    let active = true
    void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh() })
    return () => {
      active = false
      ScrollTrigger.removeEventListener('refreshInit', fitGallery)
      stage.removeEventListener('focusin', revealFocusedCard)
      stage.classList.remove('projectStage--pinned')
      gallery.classList.remove('projectGallery--pinned')
      gallery.style.removeProperty('--gallery-height')
      gallery.style.removeProperty('--gallery-card-width')
    }
  })

  const context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.sectionLabel').forEach((label) => {
      gsap.fromTo(label, { letterSpacing: '0.5em', opacity: 0.4 }, {
        letterSpacing: '0.2em', opacity: 1, duration: 1,
        scrollTrigger: { trigger: label, start: 'top 92%', once: true },
      })
    })
  })
  ScrollTrigger.refresh()
  return () => {
    cancelAnimationFrame(raf)
    responsive.revert()
    context.revert()
    lenis.destroy()
  }
}
