<template>
<main id="contenido" tabindex="-1">
<section class="hero" id="inicio">
  <div class="heroText">
    <span class="pill">{{ t('Diseñador de comunicación visual y desarrollador frontend', 'Visual communication designer and frontend developer') }}</span>
    <h1><span class="reveal">{{ t('Las ideas', 'Ideas') }}</span><span class="reveal accent">{{ t('toman', 'take') }}</span><span class="reveal">{{ t('forma.', 'shape.') }}</span></h1>
    <p class="heroLead reveal">{{ t('Diseño y desarrollo experiencias digitales donde', 'I design and build digital experiences where') }} <strong>{{ t('lo visual y lo técnico', 'design and technology') }}</strong> {{ t('se encuentran. Creatividad con criterio, experiencias confiables.', 'meet. Thoughtful design, reliable experiences.') }}</p>
    <div class="heroActions reveal">
      <a class="cta" href="#proyectos">{{ t('Explorar mi trabajo', 'Explore my work') }} <span class="arr"><SiteIcon name="down" /></span></a>
      <a class="textLink" href="#sobre-mi">{{ t('Conocé mi enfoque', 'My approach') }} <SiteIcon name="down" /></a>
    </div>
  </div>
  <div class="heroScene" role="img" :aria-label="t('Monograma de Matías Mollica formado por partículas', 'Matías Mollica’s monogram formed by particles')">
    <div class="heroGlass" aria-hidden="true"></div>
    <div class="hero3D" id="webglStage" aria-hidden="true">
      <div class="heroSilhouette"></div>
    </div>
  </div>
  <div class="heroBase"><a :aria-label="t('Seguir leyendo', 'Keep reading')" class="scrollArrow" href="#concepto"><SiteIcon name="down" /></a></div>
</section>
<section class="section" id="concepto">
  <div class="sectionLabel meta"><span class="count">01</span> / {{ t('CRITERIO DETRÁS DE LA FORMA', 'THE THINKING BEHIND THE FORM') }}</div>
  <div class="introStory">
    <div class="conceptText reveal">
      <h2 class="sectionTitle">{{ t('Dos mundos.', 'Two worlds.') }}<br /><em>{{ t('Un mismo', 'A shared') }}</em><br />{{ t('lenguaje.', 'language.') }}</h2>
      <p class="copy">{{ t('No se trata de sumar efectos, sino de hacer que cada decisión visual tenga un sentido. La estructura aporta claridad. La expresión, carácter. Su encuentro construye una experiencia propia.', 'Every visual decision should serve a purpose. Structure brings clarity. Expression brings character. Together, they make an experience feel distinctive.') }}</p>
    </div>
    <ConceptSculpture class="reveal" />
  </div>
</section>
<div aria-hidden="true" class="marquee"><div class="marqueeTrack"><b>{{ t('Diseño', 'Design') }}</b><i>✳</i><b>{{ t('Código', 'Code') }}</b><i>✳</i><b>{{ t('Ritmo', 'Rhythm') }}</b><i>✳</i><b>{{ t('Transformación', 'Transformation') }}</b><i>✳</i><b>{{ t('Diseño', 'Design') }}</b><i>✳</i><b>{{ t('Código', 'Code') }}</b><i>✳</i><b>{{ t('Ritmo', 'Rhythm') }}</b><i>✳</i><b>{{ t('Transformación', 'Transformation') }}</b><i>✳</i></div></div>
<ProjectGallery />
<PortfolioServices />
<section class="section portfolioNote" id="experiencia">
  <div class="sectionLabel meta"><span class="count">04</span> {{ t('/ EXPERIENCIA', '/ EXPERIENCE') }}</div>
  <h2 class="sectionTitle reveal">{{ t('Experiencia', 'Professional') }}<br /><em>{{ t('profesional.', 'experience.') }}</em></h2>
  <div class="experienceList">
    <article>
      <p class="meta experienceRole">{{ t('DESARROLLO FRONTEND Y DISEÑO VISUAL', 'FRONTEND DEVELOPMENT AND VISUAL DESIGN') }}</p>
      <h3>AccessDev</h3>
      <p>{{ t('Desarrollé el frontend de aplicaciones y sitios web y diseñé sus interfaces. También trabajé en logos, identidad visual, banners, publicaciones para redes y edición de video como parte de la comunicación digital.', 'I developed the frontend for apps and websites and designed their interfaces. I also created logos, visual identities, banners and social media posts, and edited video for digital campaigns.') }}</p>
    </article>
    <article>
      <p class="meta experienceRole">{{ t('ESTUDIO DIGITAL CREATIVO', 'CREATIVE DIGITAL STUDIO') }}</p>
      <h3>Krater Studio</h3>
      <p>{{ t(kraterRole, kraterRoleEnglish) }}</p>
      <a class="projectBack iconLink" :href="projectPath('krater-studio')">{{ t('Ver el caso de Krater Studio', 'View the Krater Studio case study') }} <SiteIcon name="diagonal" /></a>
    </article>
    <article>
      <p class="meta experienceRole">{{ t('DISEÑO Y PLATAFORMAS EDUCATIVAS', 'DESIGN AND LEARNING PLATFORMS') }}</p>
      <h3>Olows</h3>
      <p>{{ t('Trabajo en piezas de comunicación visual y en la experiencia del campus Moodle. Personalizo la interfaz y administro cursos, usuarios, reportes y certificados para acompañar la publicación de contenidos.', 'I develop visual communications and work on the Moodle learning experience. I customize the interface and manage courses, users, reports and certificates to support content publishing.') }}</p>
      <a class="projectBack iconLink" :href="projectPath('olows-comunicacion')">{{ t('Ver el caso de Olows', 'View the Olows case study') }} <SiteIcon name="diagonal" /></a>
    </article>
  </div>
</section>
<section class="section about" id="sobre-mi">
  <AboutIdentity class="reveal" />
  <div class="aboutText reveal">
    <div class="sectionLabel meta"><span class="count">05</span> / {{ t('SOBRE MÍ', 'ABOUT') }}</div>
    <h2 class="sectionTitle">{{ t('Hola,', 'Hi,') }}<br />{{ t('soy Matías.', 'I’m Matías.') }}</h2>
    <p>{{ t('Soy diseñador de comunicación visual y desarrollador frontend, de Montevideo, Uruguay. Mi formación en Diseño de Comunicación Visual en FADU y en desarrollo web cruza la tipografía, la composición y el código.', 'I’m a visual communication designer and frontend developer from Montevideo, Uruguay. My background in visual communication design at FADU and web development brings typography, composition and code together.') }}</p>
    <p>{{ t('Me gusta llevar una idea desde las primeras decisiones visuales hasta una interfaz que se pueda usar. Ahí aparecen las preguntas que más me interesan. Qué se entiende primero, cómo cambia la lectura en una pantalla chica y dónde el movimiento ayuda a seguir el recorrido.', 'I enjoy taking an idea from the first visual decisions to a working interface. That’s where the questions I care about come up. What do people understand first? How does reading change on a small screen? Where can motion guide someone through the experience?') }}</p>
    <p>{{ t('Ese proceso atraviesa mi trabajo en identidades, sitios, piezas audiovisuales y plataformas educativas. Me interesa que lo que una marca comunica se reconozca también en cómo se navega y se usa.', 'That process runs through my work on identities, websites, audiovisual pieces and learning platforms. I want a brand’s voice to come through in the way its products feel to navigate and use.') }}</p>
  </div>
</section>
<PortfolioLab />
<section class="section contact" id="contacto"><div class="contactGlass"></div><div class="contactBody"><div class="sectionLabel meta"><span class="count">07</span> {{ t('/ CONTACTO', '/ CONTACT') }}</div><h2 class="reveal">{{ t('Bueno, llegaste', 'You made it') }}<br/>{{ t('hasta acá.', 'this far.') }}<br/><span>{{ t('¿Le damos forma', 'Shall we make') }}</span><br/>{{ t('a algo?', 'something?') }}</h2><button class="cta" id="contactStart" type="button" aria-haspopup="dialog" aria-controls="contactPanel">{{ t('Contame qué tenés en mente', 'Tell me what you have in mind') }} <span class="arr"><SiteIcon name="right" /></span></button><div class="contactMail">{{ t('O escribime directamente a', 'Or email me directly at') }} <a href="mailto:matiasmollica99@gmail.com" style="border-bottom:1px solid currentColor">matiasmollica99@gmail.com</a></div></div></section>
<img id="maskImage" :src="sitePath('/images/monograma-b.png')" hidden alt="" />
</main>
</template>
<script setup lang="ts">
import { startHero3D } from '~/composables/useHero3D'
import { startMotion } from '~/composables/useMotion'
import { kraterRole } from '~/data/projects'
import { kraterRoleEnglish } from '~/data/projectsEnglish'

definePageMeta({ alias: '/en' })
const { t, projectPath } = usePortfolioLocale()
const sitePath = useSitePath()

let stopHero: (() => void) | undefined
let stopMotion: (() => void) | undefined
let mounted = true

onMounted(async () => {
  stopHero = startHero3D()
  try {
    const stop = await startMotion()
    if (mounted) stopMotion = stop
    else stop()
  } catch (error) {
    console.warn('No se pudieron iniciar las animaciones de scroll.', error)
  }
})

onUnmounted(() => {
  mounted = false
  stopHero?.()
  stopMotion?.()
})

useHead(() => ({ title: t('Matías Mollica — Diseño de comunicación visual y desarrollo frontend', 'Matías Mollica — Visual communication designer and frontend developer') }))
</script>
