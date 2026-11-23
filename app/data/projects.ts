import { englishMedia, englishProjects } from './projectsEnglish'
import { getCicloPostcards, type Postcard } from './cicloPostcards'

export type ImageMedia = {
  kind: 'image'
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

type VideoMedia = {
  kind: 'video'
  src: string
  poster: string
  caption: string
  summary: string
  width: number
  height: number
}

type ProjectSection = {
  title: string
  description: string
  media: (ImageMedia | VideoMedia)[]
  columns?: 2 | 3
}

export type Project = {
  slug: string
  name: string
  discipline: string
  description: string
  cover?: ImageMedia
  thumbnail?: { src: string; width: number; height: number }
  context?: string
  pending?: string
  contributions?: string[]
  resources?: { label: string; href: string; download?: boolean }[]
  postcards?: Postcard[]
  sections?: ProjectSection[]
}

function image(file: string, width: number, height: number, caption: string, alt: string): ImageMedia {
  return { kind: 'image', src: `/media/${file}.webp`, width, height, caption, alt }
}

function video(file: string, width: number, height: number, caption: string, summary: string): VideoMedia {
  return { kind: 'video', src: `/media/${file}.mp4`, poster: `/media/${file}.webp`, width, height, caption, summary }
}

const olowsCover = image('olows/somos-olows', 1551, 1564, 'Somos Olows', 'Presentación de Olows con sus tres pilares: especialistas, tecnología e inteligencia artificial.')
const kraterCover = image('krater/sitio-final', 1600, 764, 'Sitio de Krater Studio · noviembre de 2026', 'Sitio de Krater Studio con fondo oscuro y tipografía de gran escala en blanco, fucsia y violeta.')

export const kraterRole = 'Trabajo en diseño de identidad, interfaces y frontend del sitio. También preparo piezas para redes y contenido audiovisual para comunicar los servicios y proyectos del estudio.'

export const projects: Project[] = [
  {
    slug: 'olows-comunicacion',
    name: 'Olows',
    discipline: 'Identidad y comunicación visual',
    description: 'Un sistema visual para explicar cómo Olows transforma la experiencia de profesionales +50 en capacitación para empresas.',
    cover: olowsCover,
    thumbnail: { src: '/media/olows/miniatura.webp', width: 960, height: 600 },
    sections: [
      {
        title: 'Una voz para dos públicos',
        description: 'A los especialistas se los invita a convertir su experiencia en cursos. A las empresas se les presenta la capacitación como una herramienta para el trabajo diario. Las jerarquías, el color y los recursos gráficos sostienen el vínculo entre las piezas.',
        columns: 3,
        media: [
          image('olows/captacion-profesionales', 1080, 1440, 'Captación de especialistas', 'Anuncio «Convertí tu experiencia en contenido» dirigido a profesionales mayores de 50 años.'),
          image('olows/para-empresas', 1081, 1441, 'Capacitación para empresas', 'Anuncio «Capacitá y potenciá tu operación» sobre inducción, procesos y desarrollo interno.'),
          image('olows/que-vas-a-encontrar', 1551, 1564, 'Qué vas a encontrar', 'Pieza que presenta cursos breves, criterio validado y aplicación en el trabajo.'),
          image('olows/olows-tips', 1551, 1564, 'Anuncio de Olows Tips', 'Publicación que anuncia una serie de ideas prácticas extraídas de los cursos.'),
        ],
      },
      {
        title: 'El sistema de marca',
        description: 'El manual reúne las versiones de logo, el contraste entre azules y naranja, las jerarquías de Montserrat y Poppins, y el uso de curvas, orbes y tarjetas.',
        columns: 2,
        media: [
          image('olows/manual-logos', 1600, 1401, 'Manual · versiones del logo', 'Versiones primaria, secundaria y terciaria del logo de Olows.'),
          image('olows/manual-paleta', 1600, 1334, 'Manual · paleta', 'Paleta de marca en blanco, azul, naranja y azul oscuro.'),
          image('olows/manual-tipografias', 1600, 1334, 'Manual · tipografías', 'Muestras de Montserrat y Poppins.'),
          image('olows/manual-recursos', 1600, 1334, 'Manual · recursos gráficos', 'Curvas, orbes y tarjetas del sistema visual.'),
        ],
      },
      {
        title: 'Del feed al congreso',
        description: 'Las dos caras del folleto llevan el sistema a papel. Una presenta la propuesta y la otra explica cómo funciona Olows y qué obtiene la empresa.',
        columns: 2,
        media: [
          image('olows/folleto-1', 1544, 1125, 'Folleto de congreso · cara exterior', 'Cara naranja con la propuesta de capacitación y los datos de contacto.'),
          image('olows/folleto-2', 1544, 1125, 'Folleto de congreso · cara interior', 'Cara clara que resume el proceso y los servicios de capacitación, inducción y campus.'),
        ],
      },
      {
        title: 'Olows Tips en movimiento',
        description: 'El adelanto presenta los contenidos de la serie con títulos animados y una muestra de las piezas que aparecen en el feed.',
        media: [video('olows/adelanto-olows-tips', 1080, 1920, 'Adelanto de Olows Tips', 'Títulos animados presentan la serie de ideas prácticas de Olows. El adelanto muestra ejemplos de tarjetas, entre ellas «Preguntá en vez de adivinar», y anuncia la llegada del primer tip.')],
      },
    ],
  },
  {
    slug: 'krater-studio',
    name: 'Krater Studio',
    discipline: 'Identidad, desarrollo y contenido digital',
    description: 'La presencia digital de un estudio creativo, desde su sitio hasta las publicaciones y videos que explican sus servicios.',
    context: `${kraterRole} El sitio y las piezas que se muestran acá forman parte de un trabajo en equipo.`,
    cover: kraterCover,
    thumbnail: { src: '/media/krater/miniatura.webp', width: 960, height: 600 },
    sections: [
      {
        title: 'Proceso de construcción',
        description: 'La foto del escritorio registra el desarrollo del sitio. La captura de julio muestra una iteración del inicio y la de noviembre, arriba, muestra cómo quedó el mensaje en la versión posterior.',
        columns: 2,
        media: [
          image('krater/escritorio-proceso', 1600, 900, 'Registro del escritorio durante el desarrollo', 'Monitor mostrando una versión de Krater Studio mientras se trabajaba en el sitio.'),
          image('krater/sitio-en-desarrollo', 1600, 760, 'Captura de proceso · julio de 2026', 'Inicio del sitio en una iteración con el titular «Hacemos aplicaciones que impactan».'),
        ],
      },
      {
        title: 'El estudio en sus publicaciones',
        description: 'La retícula, las formas angulares y el contraste de color conectan la presentación del estudio, su oferta y la forma en que muestra proyectos como Urufiltros.',
        columns: 2,
        media: [
          image('krater/somos-krater', 1080, 1350, 'Somos Krater', 'Presentación de Krater Studio como estudio digital creativo.'),
          image('krater/lo-que-hacemos', 1080, 1350, 'Lo que hacemos', 'Publicación sobre los servicios de desarrollo web, aplicaciones, branding y ecommerce.'),
          image('krater/ejecucion-profesional', 1081, 1351, 'Ejecución profesional', 'Pieza sobre la forma de trabajo del estudio, entre estrategia, creatividad y tecnología.'),
          image('krater/comunicacion-urufiltros', 1080, 1350, 'Urufiltros · publicación de Krater Studio', 'Pieza que presenta el rediseño de marca y sitio institucional de Urufiltros con un mockup.'),
        ],
      },
      {
        title: 'Carrusel para LinkedIn',
        description: 'Cinco láminas explican cómo la jerarquía, la claridad de la oferta y las llamadas a la acción influyen en la confianza que genera un sitio.',
        columns: 3,
        media: [
          image('krater/linkedin-1', 1280, 1600, '01 · Tu web funciona', 'Portada: «Tu web funciona. ¿Pero está haciendo su trabajo?».'),
          image('krater/linkedin-2', 1280, 1600, '02 · La primera impresión', 'Lámina sobre la decisión del visitante de quedarse o irse.'),
          image('krater/linkedin-3', 1280, 1600, '03 · Qué significa funcionar', 'Un sitio puede cargar y tener botones operativos sin cumplir su objetivo.'),
          image('krater/linkedin-4', 1280, 1600, '04 · El problema', 'Cuatro obstáculos: oferta poco clara, falta de jerarquía, CTA imperceptible y falta de confianza.'),
          image('krater/linkedin-5', 1280, 1600, '05 · La presencia digital', 'Cierre que vincula la presencia digital con los objetivos del negocio.'),
        ],
      },
      {
        title: 'Comunicación en movimiento',
        description: 'Dos videos comparten herramientas para trabajar con IA. El tercero presenta el proceso del estudio, desde entender el proyecto hasta lanzarlo.',
        columns: 3,
        media: [
          video('krater/escribir-un-prompt', 576, 720, 'Cómo escribir un prompt con contexto, objetivo y formato', 'La pieza muestra cómo definir el contexto, el objetivo y el formato de un pedido. Usa como ejemplo una publicación para una tienda de muebles y propone revisar la primera respuesta antes de publicarla.'),
          video('krater/ia-segun-la-tarea', 576, 720, 'Qué herramienta de IA conviene para cada tarea', 'La pieza compara ChatGPT, Claude, Perplexity y Gemini para distintos trabajos. Cierra con una idea práctica: partir del objetivo y luego elegir dónde trabajar.'),
          video('krater/de-tu-idea-al-impacto', 576, 720, 'De tu idea al impacto · proceso de Krater Studio', 'Se muestran las etapas con las que el estudio lleva una idea a un producto digital. El recorrido incluye objetivos, audiencia, identidad y alcance, seguido por desarrollo, pruebas y lanzamiento.'),
        ],
      },
    ],
  },
  {
    slug: 'ciclo',
    name: 'Ciclo',
    discipline: 'Exploración tipográfica y diseño de postales',
    description: 'Tres interpretaciones de un ciclo a través de la forma de las letras: crecimiento, mareas y renovación.',
    context: 'Proyecto académico realizado en la materia Tipografía de la Licenciatura en Diseño de Comunicación Visual. La búsqueda parte del carácter de cada familia y lo transforma en composición: un frente visual y un dorso que reúne su fundamentación y ficha tipográfica.',
    thumbnail: { src: '/media/ciclo/miniatura.webp', width: 960, height: 600 },
    contributions: ['Investigación y selección tipográfica', 'Interpretación visual del concepto de ciclo', 'Composición de frentes y dorsos', 'Fundamentación de cada propuesta'],
    resources: [{ label: 'Descargar las postales originales (PDF)', href: '/media/ciclo/postales-ciclo.pdf', download: true }],
    postcards: getCicloPostcards(),
    sections: [{
      title: 'La búsqueda detrás de las formas',
      description: 'Comparé curvas, ritmo, contraste y continuidad para encontrar tres maneras distintas de representar un ciclo. Sansita Swashed lleva la repetición hacia el crecimiento; Spirax, hacia el encuentro y la separación; Pilowlava, hacia la mutación. El azul y el verde unen la serie, mientras cada familia define su propia lógica de composición.',
      media: [],
    }],
  },
  {
    slug: 'urufiltros',
    name: 'Urufiltros',
    discipline: 'Identidad de marca y sitio institucional',
    description: 'Un sistema de identidad y una web que organizan la oferta técnica de una empresa de filtración de aire.',
    context: 'Proyecto realizado en Krater Studio. Mi aporte abarcó el manual de marca, el sistema de logo y sus variables, la paleta, las tipografías y el sitio institucional responsive, incluida la estructura de servicios y productos.',
    cover: image('urufiltros/sitio-inicio', 1265, 712, 'Urufiltros · sitio institucional', 'Portada del sitio real de Urufiltros, con navegación, presentación de la empresa, imagen de laboratorio y accesos a servicios y contacto.'),
    thumbnail: { src: '/media/urufiltros/miniatura.webp', width: 960, height: 600 },
    contributions: ['Manual de marca', 'Sistema de logo y variables', 'Paleta y tipografías', 'Sitio institucional responsive', 'Estructura de servicios y productos'],
    resources: [
      { label: 'Visitar urufiltros.com.uy', href: 'https://urufiltros.com.uy/' },
      { label: 'Descargar el manual de marca (PDF)', href: '/media/urufiltros/manual-de-marca.pdf', download: true },
    ],
    sections: [
      {
        title: 'Un logo, distintas aplicaciones',
        description: 'El símbolo conecta las iniciales de Urufiltros con trazos curvos que sugieren circulación y movimiento. El sistema contempla la marca con nombre, el símbolo por separado y una variante monocromática para sostener su reconocimiento en distintos fondos y soportes.',
        columns: 2,
        media: [
          image('urufiltros/manual-logos', 1800, 1013, 'Manual · sistema de logo y variables', 'Página del manual con las variantes del logo de Urufiltros: marca completa, símbolo y versión monocromática.'),
          image('urufiltros/manual-aplicacion', 1800, 1013, 'Manual · aplicación de la identidad', 'Aplicación del logo de Urufiltros sobre un cartel vertical en el mockup incluido en el manual de marca.'),
        ],
      },
      {
        title: 'Color y tipografía con una función',
        description: 'El azul estructura la identidad, acompañado por tonos turquesa y verde, blanco y negro. El manual define una jerarquía cromática y el contraste entre Montserrat Bold para títulos y Georgia Regular para subtítulos y textos informativos.',
        columns: 2,
        media: [
          image('urufiltros/manual-paleta', 1800, 1013, 'Manual · paleta cromática', 'Muestras de azul #1C55DB, blanco, azul petróleo #006C99, negro, verde #12DBA0 y turquesa #4ED7DC.'),
          image('urufiltros/manual-tipografias', 1800, 1013, 'Manual · Montserrat y Georgia', 'Muestras tipográficas del manual de Urufiltros: Montserrat Bold y Georgia Regular.'),
        ],
      },
      {
        title: 'De la identidad a la navegación',
        description: 'La portada conecta la presentación de la empresa con sus servicios, productos y canales de consulta. La estructura distingue seis servicios técnicos y familias de productos como prefiltros, filtros HEPA, filtros de carbono y cabinas de flujo laminar. Las certificaciones tienen una sección propia y el contacto está disponible desde la navegación y WhatsApp.',
        columns: 2,
        media: [
          image('urufiltros/sitio-servicios', 1265, 1392, 'Sitio · estructura de servicios', 'Captura del sitio de Urufiltros con servicios de bioseguridad, flujo laminar, gases presurizados, temperatura y humedad, áreas limpias y extracción.'),
          image('urufiltros/sitio-mobile', 375, 812, 'Sitio · vista móvil', 'Captura real del inicio de Urufiltros en una pantalla móvil, con menú compacto, presentación y acceso al contacto.'),
        ],
      },
    ],
  },
]

function translateMedia<T extends ImageMedia | VideoMedia>(media: T): T {
  const copy = englishMedia[media.src.replace(/^\/media\/|\.[^.]+$/g, '')]
  if (!copy) return media
  const [caption, description] = copy
  if (!description) return { ...media, caption }

  return media.kind === 'image' ? { ...media, caption, alt: description } : { ...media, caption, summary: description }
}

export function getProjects(english: boolean): Project[] {
  if (!english) return projects

  return projects.map(project => {
    const translation = englishProjects[project.slug]
    if (!translation) return project

    const { sections, ...copy } = translation
    return {
      ...project,
      ...copy,
      postcards: project.postcards && getCicloPostcards(true),
      cover: project.cover && translateMedia(project.cover),
      sections: project.sections?.map(section => {
        const [title, description] = sections?.[section.title] ?? [section.title, section.description]
        return { ...section, title, description, media: section.media.map(translateMedia) }
      }),
    }
  })
}
