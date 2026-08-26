import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageLightbox from '../components/ImageLightbox'
import LoadingScreen from '../components/LoadingScreen'
import { useAppSettings } from '../context/AppSettingsContext'
import { usePortfolioLoader } from '../hooks/usePortfolioLoader'
import { findProjectBySlug } from '../lib/projectSlug'
import { getProjectImageSrcs } from '../lib/projectImages'
import { mapLocalizedList, pickLocalized, pickLocalizedProfile } from '../lib/localized'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { locale, t } = useAppSettings()
  const { data, loading, progress, error } = usePortfolioLoader()
  const [imageIndex, setImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const project = useMemo(() => {
    const raw = findProjectBySlug(data?.projects, slug)
    if (!raw) return null
    const [localized] = mapLocalizedList([raw], ['name', 'excerpt', 'category'], locale)
    return localized
  }, [data?.projects, slug, locale])

  const profile = useMemo(
    () => pickLocalizedProfile(data?.profile, locale),
    [data?.profile, locale],
  )

  const artikelHtml = useMemo(
    () => pickLocalized(project, 'artikel', locale) ?? project?.artikel,
    [project, locale],
  )

  useEffect(() => {
    setImageIndex(0)
    window.scrollTo(0, 0)
  }, [slug])

  if (loading) {
    return <LoadingScreen progress={progress} messageKey="loading.project" />
  }

  if (error || !project) {
    if (!project && data) {
      return <Navigate to="/" replace />
    }
    return (
      <div className="loading-screen">
        <p className="loading-text">{t('loading.failed')}</p>
      </div>
    )
  }

  const galleryImages = getProjectImageSrcs(project)

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <Navbar />

      <main className="project-detail-page">
        <div className="container">
          <Link to="/" className="project-detail-back">
            <ArrowLeft size={18} />
            {t('projectDetail.back')}
          </Link>

          {galleryImages.length > 0 && (
            <div className="project-detail-gallery">
              <button
                type="button"
                className="project-detail-gallery-frame"
                onClick={() => setLightboxOpen(true)}
                aria-label={t('projectDetail.zoom')}
              >
                <img
                  key={galleryImages[imageIndex]}
                  src={galleryImages[imageIndex]}
                  alt={`${project.name} — ${t('projectDetail.imageOf')} ${imageIndex + 1}`}
                  className="project-detail-gallery-img"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 960px, 100vw"
                />
                <span className="project-detail-gallery-hint">
                  <ZoomIn size={18} />
                  {t('projectDetail.clickZoom')}
                </span>
              </button>
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-nav gallery-prev"
                    onClick={() =>
                      setImageIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))
                    }
                    aria-label={t('projectDetail.prevImage')}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="gallery-nav gallery-next"
                    onClick={() => setImageIndex((i) => (i + 1) % galleryImages.length)}
                    aria-label={t('projectDetail.nextImage')}
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="gallery-dots">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`gallery-dot ${i === imageIndex ? 'active' : ''}`}
                        onClick={() => setImageIndex(i)}
                        aria-label={`${t('projectDetail.imageOf')} ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {galleryImages.length > 1 && (
                <div className="project-detail-thumbs" role="tablist" aria-label={t('projectDetail.pickImage')}>
                  {galleryImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      aria-selected={i === imageIndex}
                      className={`project-detail-thumb ${i === imageIndex ? 'active' : ''}`}
                      onClick={() => {
                        setImageIndex(i)
                        setLightboxOpen(true)
                      }}
                    >
                      <img src={src} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <article className="project-detail-body">
            <span className="project-category-tag">{project.category}</span>
            <h1 className="project-detail-title">{project.name}</h1>
            {project.excerpt && <p className="project-detail-excerpt">{project.excerpt}</p>}

            {artikelHtml && (
              <div
                className="modal-article project-detail-article"
                dangerouslySetInnerHTML={{ __html: artikelHtml }}
              />
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                {t('projectDetail.visit')}
              </a>
            )}
          </article>
        </div>
      </main>

      <ImageLightbox
        images={galleryImages}
        index={imageIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setImageIndex}
        title={project.name}
      />

      {profile && <Footer profile={profile} />}
    </>
  )
}
