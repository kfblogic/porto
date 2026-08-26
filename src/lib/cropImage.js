/** Ukuran tampilan max desktop; output 2× untuk layar retina. */
export const HERO_AVATAR_OUTPUT_PX = 760

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Gagal memuat gambar'))
    img.src = src
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Gagal membuat gambar'))),
      type,
      quality
    )
  })
}

/**
 * Crop persegi → Blob WebP (lebih tajam daripada JPEG di JSON base64).
 */
export async function getCroppedSquareBlob(imageSrc, pixelCrop, size = HERO_AVATAR_OUTPUT_PX) {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas tidak tersedia')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  )

  try {
    return await canvasToBlob(canvas, 'image/webp', 0.92)
  } catch {
    return canvasToBlob(canvas, 'image/png')
  }
}
