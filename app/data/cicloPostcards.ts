import type { ImageMedia } from './projects'

export type Postcard = {
  id: string
  typeface: string
  theme: string
  credits: string
  choice: string
  interpretation: string
  front: ImageMedia
  back: ImageMedia
}

export function getCicloPostcards(english = false): Postcard[] {
  const t = (es: string, en: string) => english ? en : es
  function face(id: string, typeface: string, back: boolean, alt: string): ImageMedia {
    return {
      kind: 'image',
      src: `/media/ciclo/${id}-${back ? 'dorso' : 'frente'}.webp`,
      width: 2000,
      height: 1414,
      caption: `${typeface} · ${back ? t('Dorso', 'Back') : t('Frente', 'Front')}`,
      alt,
    }
  }
  return [
    {
      id: 'sansita',
      typeface: 'Sansita Swashed',
      theme: t('Crecimiento', 'Growth'),
      credits: t('Pablo Cosgaya · Argentina', 'Pablo Cosgaya · Argentina'),
      choice: t(
        'Elegí Sansita Swashed por sus curvas y terminales ornamentales. La continuidad de sus trazos permite pensar las letras como brotes que se prolongan, se enlazan y generan nuevas direcciones.',
        'I chose Sansita Swashed for its curves and ornamental terminals. The continuity of its strokes suggests shoots that extend, intertwine and grow in new directions.',
      ),
      interpretation: t(
        'Letras y fragmentos construyen una enredadera sobre fondo blanco. El cambio de escala, la repetición y la alternancia entre azul y verde generan un recorrido orgánico. Cada forma da origen a otra: el ciclo crece y se expande en lugar de volver exactamente al mismo punto.',
        'Letters and fragments form a vine against a white background. Changes in scale, repetition and alternating blue and green create an organic path. Each shape gives rise to another: the cycle grows and expands rather than returning to the exact same point.',
      ),
      front: face('sansita', 'Sansita Swashed', false, t(
        'Frente de la postal de crecimiento: trazos curvos de Sansita Swashed en azul y verde se ramifican sobre un fondo blanco.',
        'Growth postcard front: blue and green Sansita Swashed curves branch across a white background.',
      )),
      back: face('sansita', 'Sansita Swashed', true, t(
        'Dorso original de Sansita Swashed, con la fundamentación del crecimiento, ficha tipográfica y una letra a como muestra.',
        'Original Sansita Swashed postcard back, with the growth rationale, typeface information and a specimen letter a. The printed text is in Spanish.',
      )),
    },
    {
      id: 'spirax',
      typeface: 'Spirax',
      theme: t('Mareas', 'Tides'),
      credits: t('Brenda Gallo y Gustavo Dipre · Argentina', 'Brenda Gallo and Gustavo Dipre · Argentina'),
      choice: t(
        'El carácter espiralado de Spirax sugiere giro y desplazamiento. Sus curvas permiten que las letras se lean como olas y que una misma forma construya momentos de dispersión y concentración.',
        'Spirax’s spiraling character suggests rotation and movement. Its curves let letters read as waves, using the same shapes to create moments of dispersal and concentration.',
      ),
      interpretation: t(
        'Sobre el azul, las letras verdes cambian de tamaño y se acercan hasta formar un núcleo de mayor intensidad. Ese encuentro representa la marea alta. La apertura y separación de las formas remite al retroceso del agua: un movimiento continuo de atracción, reunión y alejamiento.',
        'Against blue, green letters change scale and draw together into a dense center. That gathering represents high tide. The opening and separation of the shapes evokes receding water: a continuous movement of attraction, convergence and release.',
      ),
      front: face('spirax', 'Spirax', false, t(
        'Frente de la postal de mareas: letras verdes de Spirax de distintas escalas convergen sobre un fondo azul.',
        'Tides postcard front: green Spirax letters in different sizes converge against a blue background.',
      )),
      back: face('spirax', 'Spirax', true, t(
        'Dorso original de Spirax, con la relación entre las mareas y la composición, ficha tipográfica y una letra a como muestra.',
        'Original Spirax postcard back, with the relationship between tides and composition, typeface information and a specimen letter a. The printed text is in Spanish.',
      )),
    },
    {
      id: 'pilowlava',
      typeface: 'Pilowlava',
      theme: t('Mutación y renovación', 'Mutation and renewal'),
      credits: t('Anton Moglia y Jérémy Landes · Francia', 'Anton Moglia and Jérémy Landes · France'),
      choice: t(
        'Las formas irregulares de Pilowlava permiten tratar cada letra como materia que puede cambiar de estado. Su expresividad acompaña la idea de un ciclo abierto, donde completar una forma también puede iniciar una transformación.',
        'Pilowlava’s irregular shapes let each letter become material capable of changing state. Its expressiveness supports an open cycle, where completing a shape can also begin a transformation.',
      ),
      interpretation: t(
        'La O central funciona como llegada y origen. Alrededor, letras y fragmentos se repiten en diferentes escalas y direcciones. La composición se puede recorrer hacia el centro o hacia afuera: una lectura de la vida como cambio, renovación y apertura a caminos todavía desconocidos.',
        'The central O acts as both destination and origin. Around it, letters and fragments repeat at different scales and in different directions. The composition can be read inward or outward: life as change, renewal and the discovery of unknown paths.',
      ),
      front: face('pilowlava', 'Pilowlava', false, t(
        'Frente de la postal de mutación: una O azul central y formas de Pilowlava repetidas radialmente sobre verde.',
        'Mutation postcard front: a central blue O surrounded by radially repeated Pilowlava shapes against green.',
      )),
      back: face('pilowlava', 'Pilowlava', true, t(
        'Dorso original de Pilowlava, con la fundamentación de mutación y renovación, ficha tipográfica y una A como muestra.',
        'Original Pilowlava postcard back, with the mutation and renewal rationale, typeface information and a specimen letter A. The printed text is in Spanish.',
      )),
    },
  ]
}
