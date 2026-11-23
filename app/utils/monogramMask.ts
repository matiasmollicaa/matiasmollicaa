/** Coordinates of the opaque pixels that can receive a particle. */
export function sampleMonogramMask(image: HTMLImageElement, step = 3): [number, number][] {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context || !canvas.width || !canvas.height) return []

  context.drawImage(image, 0, 0)
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
  const samples: [number, number][] = []
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      if (pixels[(y * canvas.width + x) * 4 + 3]! > 150) samples.push([x, y])
    }
  }
  return samples
}
