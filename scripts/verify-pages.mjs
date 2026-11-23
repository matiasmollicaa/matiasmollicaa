import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const output = new URL('../.output/public/', import.meta.url)
const base = `/${(process.env.NUXT_APP_BASE_URL || '/').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/')
const slugs = ['olows-comunicacion', 'krater-studio', 'ciclo', 'urufiltros']
const routes = ['/', '/en', ...slugs.flatMap(slug => [`/proyectos/${slug}`, `/en/projects/${slug}`])]
const files = new Set()

for (const route of routes) {
  const html = await readFile(new URL(`${route.slice(1).replace(/\/$/, '')}${route === '/' ? '' : '/'}index.html`, output), 'utf8')
  assert.match(html, /<h1[\s>]/, `${route}: falta el título`)
  assert(html.includes(`lang="${route.startsWith('/en') ? 'en' : 'es-UY'}"`), `${route}: idioma incorrecto`)
  assert(html.includes('data-portfolio-theme="dark"'), `${route}: debe abrir en oscuro`)
  assert(!/localhost|127\.0\.0\.1/.test(html), `${route}: URL local en el HTML publicado`)
  assert(!html.includes('/media/sobre-mi/'), `${route}: aparece el retrato retirado`)
  for (const match of html.matchAll(/(?:src|href|poster)="(\/[^"#]*)"/g)) {
    const path = match[1].split(/[?#]/)[0]
    assert(path.startsWith(base), `${route}: recurso fuera de ${base}: ${path}`)
    files.add(decodeURIComponent(path.slice(base.length)))
  }
}

for (const file of files) {
  try {
    await access(new URL(file || 'index.html', output))
  } catch {
    await access(new URL(join(file, 'index.html').replaceAll('\\', '/'), output))
  }
}
await access(new URL('.nojekyll', output))
await access(new URL('404.html', output))
console.log(`GitHub Pages: ${routes.length} páginas y ${files.size} recursos/enlaces verificados para ${base}`)
