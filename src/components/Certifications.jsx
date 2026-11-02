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
          <h2 className="section-title">{t('sections.certifications.title')}</h2>
          <p className="section-subtitle">{t('sections.certifications.subtitle')}</p>
        </div>

        <div className="records">
          {certifications.map((cert) => {
            const assetPath = cert.image || ''
            const fileSrc = assetUrl(assetPath)
            const isPdf = isPdfCert(assetPath)
            const thumbSrc = isPdf ? (cert.cover ? assetUrl(cert.cover) : '') : fileSrc
            const thumb = thumbSrc ? (
              <img src={thumbSrc} alt={cert.name} className="cert-image" loading="lazy" />
            ) : assetPath && isPdf ? (
              <FileText size={28} strokeWidth={1.5} aria-hidden />
            ) : (
              <Award size={28} strokeWidth={1.5} aria-hidden />
            )

            return (
              <article key={cert.id} className="record">
                <div>
                  <p className="record-period">{formatDate(cert.issued_at)}</p>
                  <p className="cert-validity">
                    {t('sections.certifications.issued')}
                    {cert.expires_at && (
                      <> · {t('sections.certifications.validUntil')} <span className="nowrap">{formatDate(cert.expires_at)}</span></>
                    )}
                  </p>
                </div>
                <div className="record-main">
                  <div className="record-head">
                    {assetPath && isPdf ? (
                      <a
                        href={fileSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-thumb"
                        aria-label={`${t('sections.certifications.openPdf')}: ${cert.name}`}
                      >
                        {thumb}
                      </a>
                    ) : (
                      <div className="cert-thumb">{thumb}</div>
                    )}
                    <div>
                      <h3 className="record-title">{cert.name}</h3>
                      <p className="record-sub">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
                <div className="record-fields">
                  {cert.credential_id && (
                    <dl className="field">
                      <dt>ID</dt>
                      <dd className="cert-credential">{cert.credential_id}</dd>
                    </dl>
                  )}
                  {assetPath && isPdf && (
                    <a href={fileSrc} target="_blank" rel="noopener noreferrer" className="cert-link">
                      <FileText size={15} aria-hidden />
                      {t('sections.certifications.openPdf')}
                    </a>
                  )}
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="cert-link">
                      <ExternalLink size={15} aria-hidden />
                      {t('sections.certifications.viewCredential')}
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
