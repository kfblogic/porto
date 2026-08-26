import { Award, ExternalLink, FileText } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { assetUrl } from '../lib/uploadAsset'
import { isPdfCert } from '../lib/certAssets'
import { useAppSettings } from '../context/AppSettingsContext'

export default function Certifications({ certifications }) {
  const { locale, t } = useAppSettings()
  const ref = useScrollReveal()

  if (!certifications || certifications.length === 0) return null

  const dateLocale = locale === 'en' ? 'en-US' : 'id-ID'
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short' })
  }

  return (
    <section id="certifications" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <span className="section-label">
            <Award size={14} />
            {t('sections.certifications.label')}
          </span>
          <h2 className="section-title">{t('sections.certifications.title')}</h2>
          <p className="section-subtitle">{t('sections.certifications.subtitle')}</p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => {
            const assetPath = cert.image || ''
            const coverPath = cert.cover || ''
            const fileSrc = assetUrl(assetPath)
            const coverSrc = assetUrl(coverPath)
            const isPdf = isPdfCert(assetPath)
            const hasCover = isPdf && Boolean(coverPath)

            return (
              <div key={cert.id} className="cert-card glass-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="cert-top">
                  {hasCover ? (
                    <a
                      href={fileSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-cover-link"
                      aria-label={`Buka PDF sertifikat ${cert.name}`}
                    >
                      <img src={coverSrc} alt={cert.name} className="cert-image" />
                      <span className="cert-cover-badge">
                        <FileText size={14} />
                        PDF
                      </span>
                    </a>
                  ) : assetPath && isPdf ? (
                    <a
                      href={fileSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-pdf-preview"
                      aria-label={`Buka PDF sertifikat ${cert.name}`}
                    >
                      <FileText size={40} strokeWidth={1.5} />
                      <span>Lihat sertifikat (PDF)</span>
                    </a>
                  ) : assetPath ? (
                    <img src={fileSrc} alt={cert.name} className="cert-image" />
                  ) : (
                    <div className="cert-image-placeholder">
                      <Award size={28} />
                    </div>
                  )}
                </div>
                <div className="cert-info">
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">
                    Issued: {formatDate(cert.issued_at)}
                    {cert.expires_at && ` · Expires: ${formatDate(cert.expires_at)}`}
                  </p>
                  {cert.credential_id && (
                    <p className="cert-credential">ID: {cert.credential_id}</p>
                  )}
                  {assetPath && isPdf && (
                    <a
                      href={fileSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                    >
                      <FileText size={14} />
                      Buka PDF
                    </a>
                  )}
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="cert-link">
                      <ExternalLink size={14} />
                      {t('sections.certifications.viewCredential')}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
