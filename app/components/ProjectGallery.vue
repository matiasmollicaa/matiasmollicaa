<template>
  <section id="proyectos" class="section projectGallery" aria-labelledby="projects-title">
    <div class="projectPresentation">
    <div class="sectionLabel meta"><span class="count">02</span> / {{ t('PROYECTOS', 'WORK') }}</div>
    <div class="projectsHead">
      <h2 id="projects-title" class="sectionTitle reveal">{{ t('Proyectos', 'Selected') }}<br /><em>{{ t('destacados.', 'work.') }}</em></h2>
      <p class="reveal">{{ t('Identidades, publicaciones y experiencias web. Entrá a cada proyecto para conocer las decisiones detrás de las piezas.', 'Visual identities, social content and web experiences. Explore each project to see the decisions behind the work.') }}</p>
    </div>
    <div class="projectStage" role="region" :aria-label="t('Galería de proyectos', 'Project gallery')">
      <ul class="projectTrack">
        <li v-for="(project, index) in projects" :key="project.slug" class="projectItem">
          <a class="projectCard" :href="projectPath(project.slug)">
            <div class="projectCardVisual" :class="{ 'projectCardVisual--pending': project.pending }">
              <img
                v-if="project.thumbnail"
                :src="sitePath(project.thumbnail.src)"
                :width="project.thumbnail.width"
                :height="project.thumbnail.height"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span v-else class="projectCardType" aria-hidden="true">{{ project.name }}</span>
            </div>
            <div class="projectCardBody">
              <div>
                <span class="meta projectCardIndex">0{{ index + 1 }}</span>
                <h3>{{ project.name }}</h3>
                <p>{{ project.discipline }}</p>
                <small v-if="project.pending">{{ t('Caso en preparación', 'Case study in preparation') }}</small>
              </div>
              <span class="projectCardArrow" aria-hidden="true"><SiteIcon name="diagonal" /></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getProjects } from '~/data/projects'

const { isEnglish, t, projectPath } = usePortfolioLocale()
const sitePath = useSitePath()
const projects = computed(() => getProjects(isEnglish.value))
</script>
