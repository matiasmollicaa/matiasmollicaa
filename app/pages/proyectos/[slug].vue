<template>
  <main id="contenido" tabindex="-1" class="projectCase">
    <div id="inicio" class="projectCaseIntro">
      <a class="projectBack iconLink" :href="`${homePath}#proyectos`"><SiteIcon name="left" /> {{ t('Todos los proyectos', 'All projects') }}</a>
      <p class="meta projectDiscipline">{{ project.discipline }}</p>
      <h1 class="sectionTitle">{{ project.name }}</h1>
      <p class="projectSummary">{{ project.description }}</p>
      <p v-if="project.context" class="projectContext">{{ project.context }}</p>
      <div v-if="project.contributions?.length" class="projectContributions">
        <h2 class="meta">{{ t('MI APORTE', 'MY CONTRIBUTION') }}</h2>
        <ul><li v-for="contribution in project.contributions" :key="contribution">{{ contribution }}</li></ul>
      </div>
      <div v-if="project.resources?.length" class="projectResources">
        <a v-for="resource in project.resources" :key="resource.href" class="projectBack iconLink" :href="sitePath(resource.href)" :download="resource.download || undefined" :target="resource.download ? undefined : '_blank'" :rel="resource.download ? undefined : 'noopener noreferrer'" :aria-label="resource.download ? resource.label : resource.label + t(' (abre en otra pestaña)', ' (opens in a new tab)')">
          {{ resource.label }} <SiteIcon :name="resource.download ? 'down' : 'diagonal'" />
        </a>
      </div>
    </div>

    <figure v-if="project.cover" class="projectFigure projectCaseCover" :class="{ 'projectCaseCover--compact': project.cover.width < project.cover.height * 1.3 }">
      <button type="button" class="projectImageButton" aria-haspopup="dialog" :aria-label="t(`Ampliar: ${project.cover.caption}`, `Enlarge: ${project.cover.caption}`)" @click="openImage(project.cover.src, $event)">
        <img :src="sitePath(project.cover.src)" :width="project.cover.width" :height="project.cover.height" :alt="project.cover.alt" fetchpriority="high" />
        <span class="projectImageIcon" aria-hidden="true"><SiteIcon name="expand" /></span>
      </button>
      <figcaption>{{ project.cover.caption }}</figcaption>
    </figure>

    <p v-if="project.pending" class="projectPending">{{ project.pending }}</p>
    <PostcardCollection v-if="project.postcards?.length" :postcards="project.postcards" @enlarge="openImage" />

    <section v-for="section in project.sections" :key="section.title" class="projectCaseSection">
      <header class="projectSectionHeader">
        <h2>{{ section.title }}</h2>
        <p>{{ section.description }}</p>
      </header>
      <div v-if="section.media.length" class="projectMediaGrid" :class="`projectMediaGrid--${section.columns ?? 1}`">
        <figure v-for="media in section.media" :key="media.src" class="projectFigure" :class="{ 'projectFigure--narrow': media.kind === 'image' && media.width < media.height * .6 }">
          <video
            v-if="media.kind === 'video'"
            :src="sitePath(media.src)"
            :poster="sitePath(media.poster)"
            :width="media.width"
            :height="media.height"
            :aria-label="media.caption"
            controls
            playsinline
            preload="metadata"
            @play="pauseOtherVideos"
          >{{ t('Tu navegador no puede reproducir este video.', 'Your browser cannot play this video.') }} <a :href="sitePath(media.src)">{{ t('Abrir el MP4', 'Open the MP4') }}</a>.</video>
          <button v-else type="button" class="projectImageButton" aria-haspopup="dialog" :aria-label="t(`Ampliar: ${media.caption}`, `Enlarge: ${media.caption}`)" @click="openImage(media.src, $event)">
            <img :src="sitePath(media.src)" :width="media.width" :height="media.height" :alt="media.alt" loading="lazy" decoding="async" />
            <span class="projectImageIcon" aria-hidden="true"><SiteIcon name="expand" /></span>
          </button>
          <figcaption>
            {{ media.caption }}
            <details v-if="media.kind === 'video'" class="videoSummary">
              <summary>{{ t('Resumen del video', 'Video summary') }}</summary>
              <p>{{ media.summary }}</p>
            </details>
          </figcaption>
        </figure>
      </div>
    </section>

    <nav class="projectCaseEnd" :aria-label="t('Más proyectos', 'More projects')">
      <a class="projectBack iconLink" :href="`${homePath}#proyectos`"><SiteIcon name="left" /> {{ t('Volver a la galería', 'Back to the gallery') }}</a>
      <a class="projectBack iconLink" :href="projectPath(nextProject.slug)">{{ nextProject.name }} <SiteIcon name="right" /></a>
    </nav>
    <ProjectImageGallery v-if="images.length" ref="gallery" :images="images" :project-name="project.name" />
  </main>
</template>

<script setup lang="ts">
import { getProjects } from '~/data/projects'

definePageMeta({ alias: '/en/projects/:slug' })
const { t, isEnglish, homePath, projectPath } = usePortfolioLocale()
const sitePath = useSitePath()
const projects = getProjects(isEnglish.value)
const { slug } = useRoute().params
const index = projects.findIndex(project => project.slug === slug)
const project = projects[index]
if (!project) throw createError({ statusCode: 404, statusMessage: t('Proyecto no encontrado', 'Project not found') })

const nextProject = projects[(index + 1) % projects.length]!
const gallery = useTemplateRef<{ open: (index: number, trigger: HTMLElement) => void }>('gallery')
const images = [
  ...(project.cover ? [project.cover] : []),
  ...(project.postcards?.flatMap(postcard => [postcard.front, postcard.back]) ?? []),
  ...(project.sections?.flatMap(section => section.media.filter(media => media.kind === 'image')) ?? []),
]

useSeoMeta({
  title: `${project.name} — Matías Mollica`,
  description: project.description,
  robots: project.pending ? 'noindex, follow' : 'index, follow',
})

function openImage(src: string, event: MouseEvent) {
  const imageIndex = images.findIndex(image => image.src === src)
  if (imageIndex < 0 || !(event.currentTarget instanceof HTMLElement)) return
  gallery.value?.open(imageIndex, event.currentTarget)
}

function pauseOtherVideos(event: Event) {
  document.querySelectorAll<HTMLVideoElement>('.projectCase video').forEach(video => {
    if (video !== event.currentTarget) video.pause()
  })
}
</script>
