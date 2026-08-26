import { assetUrl } from './uploadAsset'

/** Normalisasi daftar gambar proyek dari `images[]` dan/atau `image_path`. */
export function getProjectImages(project) {
  if (!project) return []

  const fromArray = (project.images || [])
    .map((img) => (typeof img === 'string' ? img : img?.path))
    .filter(Boolean)

  if (fromArray.length > 0) return fromArray
  if (project.image_path) return [project.image_path]
  return []
}

export function getProjectCover(project) {
  return getProjectImages(project)[0] || ''
}

/** Path gambar proyek siap dipakai di `<img src>`. */
export function getProjectImageSrcs(project) {
  return getProjectImages(project).map(assetUrl)
}

export function getProjectCoverSrc(project) {
  return assetUrl(getProjectCover(project))
}
