export function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'project'
}

export function getProjectSlug(project) {
  if (project?.slug?.trim()) return project.slug.trim()
  return slugify(project?.name)
}

export function findProjectBySlug(projects, slug) {
  if (!slug || !projects?.length) return null
  return projects.find((p) => getProjectSlug(p) === slug) ?? null
}
