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
    // Tahun saja kalau sumbernya tidak menyebut bulan, supaya tidak mengarang bulan.
    if (dateStr.length === 4) return dateStr
    return new Date(dateStr).toLocaleDateString(dateLocale, { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">{t('sections.experience.title')}</h2>
          <p className="section-subtitle">{t('sections.experience.subtitle')}</p>
        </div>

        <div className="records">
          {experiences.map((exp) => (
            <article key={exp.id} className="record">
              <p className="record-period">
                <span className="nowrap">{formatDate(exp.start_date)}</span> – <span className="nowrap">{formatDate(exp.end_date)}</span>
              </p>
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
                    <p className="record-sub">
                      {exp.company_url ? (
                        <a href={exp.company_url} target="_blank" rel="noopener noreferrer" className="record-link">{exp.company}</a>
                      ) : exp.company}
                    </p>
                  </div>
                </div>
                {exp.description && <p className="record-desc">{exp.description}</p>}
              </div>
              <dl className="record-fields">
                {exp.employment_type_label && (
                  <div className="field">
                    <dt>{t('sections.experience.type')}</dt>
                    <dd>{exp.employment_type_label}</dd>
                  </div>
                )}
                {(exp.location || exp.location_type_label) && (
                  <div className="field">
                    <dt>{t('sections.experience.location')}</dt>
                    <dd>
                      {exp.location && exp.location_type_label ? `${exp.location} · ` : exp.location}
                      <span className="nowrap">{exp.location_type_label}</span>
                    </dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
