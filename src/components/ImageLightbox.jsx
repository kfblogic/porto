import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageLightbox({
  images = [],
  index = 0,
  open,
  onClose,
  onIndexChange,
  title = '',
}) {
  const hasMultiple = images.length > 1
  const current = images[index] ?? ''

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMultiple) {
        onIndexChange((i) => (i === 0 ? images.length - 1 : i - 1))
      }
      if (e.key === 'ArrowRight' && hasMultiple) {
        onIndexChange((i) => (i + 1) % images.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, hasMultiple, images.length, onClose, onIndexChange])

  if (!open || !current) return null

  const goPrev = (e) => {
    e.stopPropagation()
    onIndexChange((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const goNext = (e) => {
    e.stopPropagation()
    onIndexChange((i) => (i + 1) % images.length)
  }

  return (
    <div
      className="image-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Galeri: ${title}` : 'Galeri gambar'}
      onClick={onClose}
    >
      <button
        type="button"
        className="image-lightbox-close"
        onClick={onClose}
        aria-label="Tutup"
      >
        <X size={22} />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-prev"
            onClick={goPrev}
            aria-label="Gambar sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            className="image-lightbox-nav image-lightbox-next"
            onClick={goNext}
            aria-label="Gambar berikutnya"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="image-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={current}
          alt={title ? `${title} — gambar ${index + 1}` : `Gambar ${index + 1}`}
          className="image-lightbox-img"
          decoding="async"
        />
        {hasMultiple && (
          <p className="image-lightbox-counter">
            {index + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  )
}
