export function fileExtension(nameOrType, fallback = 'webp') {
  if (nameOrType?.includes('/')) {
    const map = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'application/pdf': 'pdf' }
    return map[nameOrType] || fallback
  }
  const m = String(nameOrType || '').match(/\.([a-z0-9]+)$/i)
  return m ? m[1].toLowerCase() : fallback
}

export const ASSET_NAMES = {
  profilePhoto: (ext = 'webp') => `profile.${ext}`,
  cv: () => 'cv.pdf',
  experiencePhoto: (id, ext = 'webp') => `experience-${id}.${ext}`,
  certificationImage: (id, ext = 'webp') => `cert-${id}.${ext}`,
  certificationCover: (id, ext = 'webp') => `cert-${id}-cover.${ext}`,
  projectImage: (projectId, index, ext = 'webp') => `project-${projectId}-${index}.${ext}`,
}
