import { useEffect } from 'react'
import { X, ExternalLink, Download } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'

export default function CVModal({ cvPath, isOpen, onClose }) {
  const { t } = useAppSettings()
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOpenNewTab = () => {
    if (cvPath) {
      window.open(cvPath, '_blank')
    }
  }

  const handleDownload = () => {
    if (cvPath) {
      const link = document.createElement('a')
      link.href = cvPath
      link.download = cvPath.startsWith('data:') || cvPath.includes('/cv/') ? 'cv.pdf' : undefined
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t('cvModal.close')}>
          <X size={20} />
        </button>

        <div className="cv-modal-content">
          <div className="cv-modal-header">
            <h2 className="cv-modal-title">{t('cvModal.title')}</h2>
            <p className="cv-modal-subtitle">{t('cvModal.subtitle')}</p>
          </div>

          <div className="cv-modal-body">
            {cvPath ? (
              <div className="cv-preview-container">
                <iframe
                  src={cvPath}
                  className="cv-preview"
                  title="CV Preview"
                  onError={() => {
                    // If iframe fails, show fallback
                    document.querySelector('.cv-preview-fallback')?.classList.remove('hidden')
                    document.querySelector('.cv-preview')?.classList.add('hidden')
                  }}
                />
                <div className="cv-preview-fallback hidden">
                  <div className="cv-fallback-content">
                    <Download size={48} className="text-accent-secondary mb-4" />
                    <p className="text-text-secondary mb-4">
                      Preview not available. Please download or open in a new tab.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cv-preview-fallback">
                <div className="cv-fallback-content">
                  <p className="text-text-secondary">No CV available</p>
                </div>
              </div>
            )}
          </div>

          <div className="cv-modal-footer">
            <button
              onClick={handleOpenNewTab}
              className="btn btn-outline"
              disabled={!cvPath}
            >
              <ExternalLink size={18} />
              {t('cvModal.openTab')}
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              disabled={!cvPath}
            >
              <Download size={18} />
              {t('cvModal.download')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
