/** Public paths must include the repository prefix on GitHub project sites. */
export function useSitePath() {
  const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return (path: string) => path.startsWith('/') && !path.startsWith('//')
    ? `${baseURL}${path}`
    : path
}
