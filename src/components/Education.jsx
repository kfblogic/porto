import { useScrollReveal } from '../hooks/useScrollReveal'
import { useAppSettings } from '../context/AppSettingsContext'

export default function Education({ educations }) {
  const { locale, t } = useAppSettings()
  const ref = useScrollReveal()

  if (!educations || educations.length === 0) return null

  const dateLocale = locale === 'en' ? 'en-US' : 'id-ID'
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short' })
  }

  return (
    <section id="education" className="section">
      <div className="container" ref={ref}>
        <div className="card-wrap">
          <div className="card card--green" data-seq="KFB 0006">
            <div className="section-header">
              <h2 className="section-title">{t('sections.education.title')}</h2>
              <p className="section-subtitle">{t('sections.education.subtitle')}</p>
            </div>

            <div className="records">
              {educations.map((edu) => (
                <article key={edu.id} className="record">
                  <div className="record-main">
                    <h3 className="record-title">{edu.school}</h3>
                    <p className="record-sub">{edu.degree} · {edu.program}</p>
                    {edu.description && <p className="record-desc">{edu.description}</p>}
                  </div>
                  <dl className="record-fields">
                    <div className="field">
                      <dt>{t('sections.education.period')}</dt>
                      <dd>{formatDate(edu.start_date)} – {formatDate(edu.end_date)}</dd>
                    </div>
                    {edu.grade && (
                      <div className="field">
                        <dt>{t('sections.education.grade')}</dt>
                        <dd className="field-big">{edu.grade}</dd>
                      </div>
                    )}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
