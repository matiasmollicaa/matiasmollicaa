# Matías Mollica — Portfolio

Portfolio bilingüe de diseño de comunicación visual y desarrollo frontend. Nuxt 4, Vue 3, Three.js, GSAP, Lenis y SCSS. Incluye los casos Olows, Krater Studio, Ciclo y Urufiltros, galerías de imágenes y postales interactivas de frente y dorso.

## Desarrollo local

Usar Node.js 22 LTS y npm.

```sh
npm ci
npm run dev
```

La web abre en español y modo oscuro. Ofrece inglés desde el encabezado y recuerda la preferencia de tema. «Sobre mí» utiliza una composición gráfica sin fotografía personal. El contacto prepara un borrador en la aplicación de correo del visitante mediante `mailto:`; no hay backend de envío.

## GitHub Pages

Dirección prevista: https://matiasmollicaa.github.io/matiasmollicaa/

El workflow `.github/workflows/pages.yml` genera las diez páginas en HTML, comprueba sus enlaces y publica `.output/public`. La URL y el prefijo se leen de la configuración de Pages, por lo que también admite dominio propio o un repositorio de usuario.

En **Settings → Pages → Build and deployment → Source**, seleccionar **GitHub Actions**. Los cambios en `main` disparan la publicación. También se puede iniciar manualmente desde **Actions → Publicar portfolio en GitHub Pages → Run workflow**.

Para generar y comprobar localmente la misma versión en PowerShell:

```powershell
$env:NUXT_APP_BASE_URL='/matiasmollicaa/'
$env:NUXT_PUBLIC_SITE_URL='https://matiasmollicaa.github.io'
npm run build:pages
npm run verify:pages
```

Se publican los archivos de `.output/public`, que incluye `.nojekyll`. No subir `node_modules`, `.nuxt`, `.data`, archivos `.env`, referencias internas ni fotografías descartadas.

## Recuperar la versión anterior

La actualización conserva el historial del repositorio. Antes de reemplazarlo se guarda la rama `respaldo/antes-nuxt-2026-11-23`, con el sitio anterior. No borrar el repositorio ni forzar la historia para actualizarlo.

## Estructura

- `app/pages/`: inicio y páginas de proyectos, con versiones en español e inglés.
- `app/data/`: contenido, contribuciones, medios y fundamentos de Ciclo.
- `app/components/`: galerías, escenas, servicios y navegación.
- `app/composables/`: idioma, rutas con prefijo, animaciones e interacciones.
- `public/media/`: imágenes optimizadas, cuatro videos y PDF descargables de los proyectos.
- `scripts/verify-pages.mjs`: comprobación de la exportación estática.

Basteleur se utiliza para titulares; Arial para texto e interfaz. Los medios y las animaciones conservan el diseño aprobado y las alternativas de movimiento reducido.
