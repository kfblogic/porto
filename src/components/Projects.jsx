import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, SearchX } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getProjectImages, getProjectCoverSrc } from '../lib/projectImages'
import { getProjectSlug } from '../lib/projectSlug'
import { useAppSettings } from '../context/AppSettingsContext'

const ALL_CATEGORY = 'All'

export default function Projects({ projects, categories }) {
  const { t } = useAppSettings()
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY)
  const ref = useScrollReveal()

  const displayCategories = useMemo(() => {
    const list = categories?.length ? [...categories] : [ALL_CATEGORY]
    if (!list.includes(ALL_CATEGORY)) list.unshift(ALL_CATEGORY)
    return list
  }, [categories])

  const categoryLabel = (cat) =>
    cat === ALL_CATEGORY ? t('sections.projects.all') : cat

  const filtered =
    selectedCategory === ALL_CATEGORY
      ? projects
      : projects?.filter((p) => p.category === selectedCategory)

  const isEmpty = !filtered || filtered.length === 0

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-label">
            <FolderOpen size={14} />
            {t('sections.projects.label')}
          </span>
          <h2 className="section-title">{t('sections.projects.title')}</h2>
          <p className="section-subtitle">{t('sections.projects.subtitle')}</p>
        </div>

        <div className="project-filters">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>

        {isEmpty ? (
          <div className="projects-empty">
            <SearchX size={48} strokeWidth={1.5} />
            <p className="projects-empty-title">
              {t('sections.projects.emptyTitle', {
                category: categoryLabel(selectedCategory),
              })}
            </p>
            <p className="projects-empty-desc">{t('sections.projects.emptyDesc')}</p>
            {selectedCategory !== ALL_CATEGORY && (
              <button
                type="button"
                className="filter-btn projects-empty-reset"
                onClick={() => setSelectedCategory(ALL_CATEGORY)}
              >
                {t('sections.projects.showAll')}
              </button>
            )}
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((project, index) => {
              const cover = getProjectCoverSrc(project)
              const imageCount = getProjectImages(project).length
              const projectSlug = getProjectSlug(project)

              return (
                <Link
                  key={project.id}
                  to={`/project/${projectSlug}`}
                  className="project-card glass-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="project-image-container">
                    {cover ? (
                      <img src={cover} alt={project.name} className="project-image" />
                    ) : (
                      <div className="project-image-placeholder">
                        <FolderOpen size={40} />
                      </div>
                    )}
                    {imageCount > 1 && (
                      <span className="project-image-count">
                        {imageCount} {t('sections.projects.photos')}
                      </span>
                    )}
                    <div className="project-overlay">
                      <span className="project-overlay-text">
                        {t('sections.projects.viewDetail')}
                      </span>
                    </div>
                  </div>
                  <div className="project-info">
                    <span className="project-category-tag">{project.category}</span>
                    <h3 className="project-name">{project.name}</h3>
                    {project.excerpt && (
                      <p className="project-excerpt">{project.excerpt}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
