import { Building2 } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useAppSettings } from '../context/AppSettingsContext'

export default function Experience({ experiences }) {
  const { locale, t } = useAppSettings()
  const ref = useScrollReveal()

  if (!experiences || experiences.length === 0) return null

  const dateLocale = locale === 'en' ? 'en-US' : 'id-ID'
  const formatDate = (dateStr) => {
    if (!dateStr) return t('sections.experience.present')
    return new Date(dateStr).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="card-wrap">
          <div className="card card--yellow" data-seq="KFB 0007">
            <div className="section-header">
              <h2 className="section-title">{t('sections.experience.title')}</h2>
              <p className="section-subtitle">{t('sections.experience.subtitle')}</p>
            </div>

            <div className="records">
              {experiences.map((exp) => (
                <article key={exp.id} className="record">
                  <div className="record-main">
                    <div className="record-head">
                      {exp.photo ? (
                        <img src={exp.photo} alt={exp.company} className="record-logo" />
                      ) : (
                        <span className="record-logo">
                          <Building2 size={20} aria-hidden />
                        </span>
                      )}
                      <div>
                        <h3 className="record-title">{exp.title}</h3>
                        <p className="record-sub">{exp.company}</p>
                      </div>
                    </div>
                    {exp.description && <p className="record-desc">{exp.description}</p>}
                  </div>
                  <dl className="record-fields">
                    <div className="field">
                      <dt>{t('sections.experience.type')}</dt>
                      <dd>{exp.employment_type_label}</dd>
                    </div>
                    <div className="field">
                      <dt>{t('sections.experience.period')}</dt>
                      <dd>{formatDate(exp.start_date)} – {formatDate(exp.end_date)}</dd>
                    </div>
                    <div className="field">
                      <dt>{t('sections.experience.location')}</dt>
                      <dd>
                        {exp.location && `${exp.location} · `}
                        <span className="nowrap">{exp.location_type_label}</span>
                      </dd>
                    </div>
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
