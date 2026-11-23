export function usePortfolioLocale() {
  const route = useRoute()
  const sitePath = useSitePath()
  const isEnglish = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
  const t = (spanish: string, english: string) => isEnglish.value ? english : spanish
  const homePath = computed(() => sitePath(t('/', '/en')))
  const projectPath = (slug: string) => sitePath(t(`/proyectos/${slug}`, `/en/projects/${slug}`))
  const localPaths = computed(() => {
    const slug = route.params.slug
    return typeof slug === 'string'
      ? { es: `/proyectos/${slug}`, en: `/en/projects/${slug}` }
      : { es: '/', en: '/en' }
  })
  const alternatePath = computed(() => sitePath(isEnglish.value ? localPaths.value.es : localPaths.value.en))

  return { isEnglish, t, homePath, projectPath, localPaths, alternatePath }
}
