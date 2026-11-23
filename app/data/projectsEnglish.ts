type ProjectCopy = {
  discipline: string
  description: string
  context?: string
  pending?: string
  contributions?: string[]
  resources?: { label: string; href: string; download?: boolean }[]
  sections?: Record<string, [title: string, description: string]>
}

export const kraterRoleEnglish = 'I work on visual identity, interface design and the frontend of the website. I also create social and audiovisual content to communicate the studio’s services and projects.'

export const englishProjects: Record<string, ProjectCopy> = {
  'olows-comunicacion': {
    discipline: 'Visual identity and communication',
    description: 'A visual system that explains how Olows turns the expertise of professionals over 50 into training for businesses.',
    sections: {
      'Una voz para dos públicos': [
        'One voice for two audiences',
        'Specialists are invited to turn their expertise into courses, while businesses see how training can support their day-to-day work. Hierarchy, color and graphic elements connect the pieces.',
      ],
      'El sistema de marca': [
        'The brand system',
        'The guidelines bring together the logo variants, the contrast between blues and orange, the roles of Montserrat and Poppins, and the use of curves, spheres and cards.',
      ],
      'Del feed al congreso': [
        'From social feeds to print',
        'The conference brochure carries the visual system onto paper. One side introduces the offer and the other explains how Olows works and what businesses get.',
      ],
      'Olows Tips en movimiento': [
        'Olows Tips in motion',
        'The teaser introduces the series with animated titles and a glimpse of the pieces that appear in the feed.',
      ],
    },
  },
  'krater-studio': {
    discipline: 'Identity, web development and digital content',
    description: 'The digital presence of a creative studio, from its website to the posts and videos that explain its services.',
    context: `${kraterRoleEnglish} The website and materials shown here were a team effort.`,
    sections: {
      'Proceso de construcción': [
        'Building the website',
        'The desk photo documents the site in development. The July screenshot shows an early homepage iteration. The November capture above presents the message in the later version.',
      ],
      'El estudio en sus publicaciones': [
        'The studio on social media',
        'The grid, angular shapes and color contrast connect the studio introduction, its services and the way it presents projects like Urufiltros.',
      ],
      'Carrusel para LinkedIn': [
        'LinkedIn carousel',
        'Five slides explain how hierarchy, a clear offer and visible calls to action affect the trust a website inspires.',
      ],
      'Comunicación en movimiento': [
        'Communication in motion',
        'Two videos share practical ways to work with AI. The third introduces the studio’s process, from understanding a project to launching it.',
      ],
    },
  },
  ciclo: {
    discipline: 'Typographic exploration and postcard design',
    description: 'Three interpretations of a cycle through letterforms: growth, tides and renewal.',
    context: 'An academic project for the Typography course in my Bachelor’s degree in Visual Communication Design. Each typeface’s character becomes a composition: a visual front and a back bringing together the design rationale and typeface information.',
    contributions: ['Typeface research and selection', 'Visual interpretations of a cycle', 'Front and back compositions', 'Rationale for each proposal'],
    resources: [{ label: 'Download the original postcards (PDF)', href: '/media/ciclo/postales-ciclo.pdf', download: true }],
    sections: {
      'La búsqueda detrás de las formas': [
        'The search behind the shapes',
        'I compared curves, rhythm, contrast and continuity to find three ways to represent a cycle. Sansita Swashed takes repetition toward growth; Spirax, toward convergence and separation; Pilowlava, toward mutation. Blue and green unite the series, while each typeface defines its own compositional logic.',
      ],
    },
  },
  urufiltros: {
    discipline: 'Brand identity and corporate website',
    description: 'An identity system and website that organize the technical offer of an air filtration company.',
    context: 'A Krater Studio project. My work covered the brand guidelines, logo system and variants, color palette, typography and responsive corporate website, including the structure of services and products.',
    contributions: ['Brand guidelines', 'Logo system and variants', 'Color palette and typography', 'Responsive corporate website', 'Service and product structure'],
    resources: [
      { label: 'Visit urufiltros.com.uy', href: 'https://urufiltros.com.uy/' },
      { label: 'Download the brand guidelines (PDF)', href: '/media/urufiltros/manual-de-marca.pdf', download: true },
    ],
    sections: {
      'Un logo, distintas aplicaciones': [
        'One logo, different applications',
        'The symbol connects Urufiltros’s initials with curved strokes suggesting circulation and movement. The system includes the full brand name, the standalone symbol and a monochrome variant for recognition across different backgrounds and formats.',
      ],
      'Color y tipografía con una función': [
        'Color and typography with a purpose',
        'Blue anchors the identity, supported by turquoise, green, white and black. The guidelines define a color hierarchy and the contrast between Montserrat Bold for headings and Georgia Regular for subheadings and informational text.',
      ],
      'De la identidad a la navegación': [
        'From identity to navigation',
        'The homepage connects the company introduction with its services, products and contact channels. The structure distinguishes six technical services and product families such as prefilters, HEPA filters, carbon filters and laminar flow cabinets. Certifications have their own section, and visitors can make an inquiry through the navigation or WhatsApp.',
      ],
    },
  },
}

export const englishMedia: Record<string, [caption: string, description?: string]> = {
  'urufiltros/sitio-inicio': ['Urufiltros · Corporate website', 'The actual Urufiltros homepage, with navigation, a company introduction, a laboratory image and links to services and contact.'],
  'urufiltros/manual-logos': ['Guidelines · Logo system and variants', 'Urufiltros brand guidelines showing the full logo, standalone symbol and monochrome version.'],
  'urufiltros/manual-aplicacion': ['Guidelines · Identity in use', 'The Urufiltros logo on a vertical sign in the mockup included in the brand guidelines.'],
  'urufiltros/manual-paleta': ['Guidelines · Color palette', 'Swatches of blue #1C55DB, white, deep blue #006C99, black, green #12DBA0 and turquoise #4ED7DC.'],
  'urufiltros/manual-tipografias': ['Guidelines · Montserrat and Georgia', 'Typeface samples from the Urufiltros guidelines: Montserrat Bold and Georgia Regular.'],
  'urufiltros/sitio-servicios': ['Website · Service structure', 'An actual Urufiltros screenshot showing biosafety, laminar flow, pressurized gases, temperature and humidity, cleanroom and extraction services.'],
  'urufiltros/sitio-mobile': ['Website · Mobile view', 'An actual mobile screenshot of the Urufiltros homepage, showing a compact menu, company introduction and contact link.'],
  'olows/somos-olows': ['Meet Olows', 'Olows introduces its three pillars: specialists, technology and artificial intelligence.'],
  'olows/captacion-profesionales': ['Recruiting specialists', 'A campaign inviting professionals over 50 to turn their experience into course content.'],
  'olows/para-empresas': ['Training for businesses', 'Campaign about onboarding, internal processes and staff development.'],
  'olows/que-vas-a-encontrar': ['What you’ll find', 'The design highlights short courses, proven expertise and practical applications at work.'],
  'olows/olows-tips': ['Olows Tips announcement', 'A social post announcing a series of practical ideas drawn from Olows courses.'],
  'olows/manual-logos': ['Brand guidelines · Logo variants', 'Primary, secondary and tertiary versions of the Olows logo.'],
  'olows/manual-paleta': ['Brand guidelines · Color palette', 'The brand palette uses white, blue, orange and dark blue.'],
  'olows/manual-tipografias': ['Brand guidelines · Typography', 'Examples of Montserrat and Poppins from the brand guidelines.'],
  'olows/manual-recursos': ['Brand guidelines · Graphic elements', 'Curves, spheres and cards used across the visual system.'],
  'olows/folleto-1': ['Conference brochure · Outside', 'Orange side showing the training offer and contact details.'],
  'olows/folleto-2': ['Conference brochure · Inside', 'Light-colored side summarizing the process and the training, onboarding and learning platform services.'],
  'olows/adelanto-olows-tips': ['Olows Tips teaser', 'Animated titles introduce the Olows series of practical ideas. The teaser shows sample cards, including “Ask instead of guessing,” and announces the first tip.'],
  'krater/sitio-final': ['Krater Studio website · November 2026', 'The Krater Studio website pairs a dark background with large white, magenta and violet type.'],
  'krater/escritorio-proceso': ['Desk photo during development', 'A monitor showing a work-in-progress version of the Krater Studio website.'],
  'krater/sitio-en-desarrollo': ['Development screenshot · July 2026', 'An early homepage iteration with a headline about building apps that make an impact.'],
  'krater/somos-krater': ['Meet Krater', 'A social post introducing Krater Studio as a creative digital studio.'],
  'krater/lo-que-hacemos': ['What we do', 'A post about web development, apps, branding and e-commerce services.'],
  'krater/ejecucion-profesional': ['How the studio works', 'The post describes the studio’s approach through strategy, creativity and technology.'],
  'krater/comunicacion-urufiltros': ['Urufiltros · Krater Studio post', 'A social post presenting the Urufiltros brand and website redesign in a mockup.'],
  'krater/linkedin-1': ['01 · Your website works', 'Cover asking whether a functioning website is doing its job.'],
  'krater/linkedin-2': ['02 · First impressions', 'A slide about what determines whether visitors stay or leave.'],
  'krater/linkedin-3': ['03 · What it means to work', 'A website can load and have functional buttons yet still miss its purpose.'],
  'krater/linkedin-4': ['04 · The problem', 'Four obstacles: an unclear offer, weak hierarchy, an easy-to-miss call to action and a lack of trust.'],
  'krater/linkedin-5': ['05 · Digital presence', 'Closing slide connecting a digital presence to business goals.'],
  'krater/escribir-un-prompt': ['Writing a prompt with context, purpose and format', 'The video shows how to define the context, goal and format of a request. A social post for a furniture store illustrates how to revise a first answer before publishing.'],
  'krater/ia-segun-la-tarea': ['Choosing an AI tool for the task', 'The video compares ChatGPT, Claude, Perplexity and Gemini for different tasks. Its closing advice is to start with the goal, then choose a tool.'],
  'krater/de-tu-idea-al-impacto': ['From idea to impact · The Krater Studio process', 'The video shows how the studio turns an idea into a digital product. It covers goals, audience, identity and scope, followed by development, testing and launch.'],
}
