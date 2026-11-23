type Translate = (spanish: string, english: string) => string

export function initializeInteractions(t: Translate): () => void {
  const listeners = new AbortController()
  const { signal } = listeners
  const menu = document.querySelector<HTMLElement>('#menu')!
  const menuButton = document.querySelector<HTMLButtonElement>('#menuBtn')!
  const menuClose = document.querySelector<HTMLButtonElement>('#menuClose')!
  const panel = document.querySelector<HTMLElement>('#contactPanel')!
  const content = document.querySelector<HTMLElement>('#siteContent')!
  let activeModal: HTMLElement | undefined
  let opener: HTMLElement | undefined
  let previousOverflow = ''

  function showModal(modal: HTMLElement, trigger: HTMLElement, initialFocus: HTMLElement) {
    if (activeModal) return

    activeModal = modal
    opener = trigger
    previousOverflow = document.body.style.overflow
    modal.inert = false
    modal.removeAttribute('aria-hidden')
    modal.classList.add('open')
    if (modal === menu) menuButton.setAttribute('aria-expanded', 'true')
    content.inert = true
    document.body.style.overflow = 'hidden'
    initialFocus.focus({ preventScroll: true })
    if (document.activeElement !== initialFocus) {
      requestAnimationFrame(() => {
        if (activeModal === modal) initialFocus.focus({ preventScroll: true })
      })
    }
  }

  function hideModal(destination = opener) {
    const modal = activeModal
    if (!modal) return

    content.inert = false
    document.body.style.overflow = previousOverflow
    destination?.focus({ preventScroll: true })
    modal.inert = true
    modal.setAttribute('aria-hidden', 'true')
    modal.classList.remove('open')
    if (modal === menu) menuButton.setAttribute('aria-expanded', 'false')
    activeModal = undefined
    opener = undefined
  }

  menuButton.addEventListener('click', () => showModal(menu, menuButton, menuClose), { signal })
  menuClose.addEventListener('click', () => hideModal(), { signal })
  menu.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.pathname === location.pathname && link.hash
        ? document.getElementById(link.hash.slice(1))
        : null
      if (target && !target.hasAttribute('tabindex')) target.tabIndex = -1
      hideModal(target ?? undefined)
    }, { signal })
  })

  document.addEventListener('keydown', event => {
    if (!activeModal) return
    if (event.key === 'Escape') {
      event.preventDefault()
      hideModal()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...activeModal.querySelectorAll<HTMLElement>('a[href], button, input, textarea')].filter(
      element => !element.matches(':disabled') && element.tabIndex >= 0 && element.getClientRects().length > 0,
    )
    const first = focusable[0]
    const last = focusable.at(-1)
    const active = document.activeElement
    const wrap = !activeModal.contains(active) || (event.shiftKey ? active === first : active === last)
    if (wrap) {
      event.preventDefault()
      const next = event.shiftKey ? last : first
      next?.focus()
    }
  }, { signal })

  const contactStart = document.querySelector<HTMLButtonElement>('#contactStart')
  if (contactStart) {
    const form = panel.querySelector<HTMLFormElement>('#dialogForm')!
    const input = form.querySelector<HTMLInputElement>('#dialogInput')!
    const textarea = form.querySelector<HTMLTextAreaElement>('#dialogTextarea')!
    const back = form.querySelector<HTMLButtonElement>('#dialogBack')!
    const nextLabel = form.querySelector<HTMLElement>('#dialogNextLabel')!
    const error = form.querySelector<HTMLElement>('#dialogError')!
    const title = panel.querySelector<HTMLElement>('#dialogQuestion')!
    const hint = panel.querySelector<HTMLElement>('#dialogInfo')!
    const count = panel.querySelector<HTMLElement>('#dialogCount')!
    const answers = ['', '', '']
    let step = 0

    const questions = [
      [t('¿Cómo te llamás?', 'What’s your name?'), t('Arranquemos por lo básico.', 'Let’s start with the basics.'), t('Tu nombre', 'Your name')],
      [t('¿Qué tenés en mente?', 'What do you have in mind?'), t('Una idea, un problema, una web, una marca…', 'An idea, a problem, a website, a brand…'), t('Contame un poco sobre tu proyecto', 'Tell me a little about your project')],
      [t('¿A qué correo te respondo?', 'Where can I reach you?'), t('Así seguimos la conversación.', 'That’s how we can keep in touch.'), t('Tu correo electrónico', 'Your email address')],
    ] as const

    function activeField() {
      return step === 1 ? textarea : input
    }

    function clearError() {
      error.textContent = ''
      activeField().removeAttribute('aria-invalid')
    }

    function updateStep() {
      const [label, description, placeholder] = questions[step]!
      title.textContent = label
      hint.textContent = description
      count.textContent = '0' + (step + 1) + ' / 03'
      nextLabel.textContent = step === 2 ? t('Abrir correo', 'Open email app') : t('Siguiente', 'Next')
      input.hidden = step === 1
      textarea.hidden = step !== 1
      back.hidden = step === 0
      input.type = step === 2 ? 'email' : 'text'
      input.autocomplete = step === 2 ? 'email' : 'name'
      activeField().value = answers[step] ?? ''
      activeField().placeholder = placeholder
      clearError()
    }

    function fieldError(message: string) {
      activeField().setAttribute('aria-invalid', 'true')
      error.textContent = message
      activeField().focus()
    }

    contactStart.addEventListener('click', () => {
      step = 0
      updateStep()
      showModal(panel, contactStart, input)
    }, { signal })
    panel.querySelector<HTMLButtonElement>('#dialogClose')?.addEventListener('click', () => hideModal(), { signal })
    panel.addEventListener('click', event => {
      if (event.target === panel) hideModal()
    }, { signal })
    form.addEventListener('input', clearError, { signal })
    back.addEventListener('click', () => {
      answers[step] = activeField().value
      step--
      updateStep()
      activeField().focus()
    }, { signal })
    form.addEventListener('submit', event => {
      event.preventDefault()
      const value = activeField().value.trim()
      if (!value) {
        fieldError(t('Completá este campo para continuar.', 'Fill in this field to continue.'))
        return
      }
      if (step === 2 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        fieldError(t('Ingresá un correo válido.', 'Enter a valid email address.'))
        return
      }

      answers[step] = value
      if (step < 2) {
        step++
        updateStep()
        activeField().focus()
        return
      }

      const subject = encodeURIComponent(t('Consulta desde el portfolio', 'Portfolio inquiry') + ' — ' + answers[0])
      const body = encodeURIComponent([
        t('Hola Matías,', 'Hi Matías,'),
        '',
        answers[1],
        '',
        t('Mi nombre: ', 'My name: ') + answers[0],
        t('Mi email: ', 'My email: ') + answers[2],
      ].join('\n'))
      window.location.href = 'mailto:matiasmollica99@gmail.com?subject=' + subject + '&body=' + body
      hideModal()
    }, { signal })
  }

  document.body.classList.add('motion-ready')
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: .1 })
  document.querySelectorAll<HTMLElement>('.reveal').forEach((element, index) => {
    if (element.closest('.hero')) element.style.transitionDelay = (index % 5) * 110 + 'ms'
    revealObserver.observe(element)
  })

  const progress = document.querySelector<HTMLElement>('#progress')!
  let scrollFrame = 0
  window.addEventListener('scroll', () => {
    if (scrollFrame) return
    scrollFrame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight
      progress.style.width = (max ? scrollY / max * 100 : 0) + '%'
      scrollFrame = 0
    })
  }, { passive: true, signal })

  if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
    const cursor = document.querySelector<HTMLElement>('#cursor')!
    window.addEventListener('pointermove', event => {
      cursor.style.transform = 'translate(' + event.clientX + 'px,' + event.clientY + 'px) translate(-50%,-50%)'
      cursor.style.opacity = '1'
    }, { signal })
    document.querySelectorAll('a,button').forEach(element => {
      element.addEventListener('pointerenter', () => cursor.classList.add('active'), { signal })
      element.addEventListener('pointerleave', () => cursor.classList.remove('active'), { signal })
    })
  }

  return () => {
    hideModal()
    listeners.abort()
    cancelAnimationFrame(scrollFrame)
    revealObserver.disconnect()
    document.body.classList.remove('motion-ready')
  }
}
