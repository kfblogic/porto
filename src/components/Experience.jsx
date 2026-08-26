import { Building2, Calendar, MapPin } from 'lucide-react'
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
        <div className="section-header">
          <span className="section-label">
            <Building2 size={14} />
            {t('sections.experience.label')}
          </span>
          <h2 className="section-title">{t('sections.experience.title')}</h2>
          <p className="section-subtitle">{t('sections.experience.subtitle')}</p>
        </div>

        <div className="experience-timeline">
          <div className="timeline-line" />
          {experiences.map((exp, index) => (
            <div key={exp.id} className="experience-item" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="timeline-dot" />
              <div className="experience-card glass-card">
                <div className="experience-top">
                  <div className="experience-company-info">
                    {exp.photo ? (
                      <img src={exp.photo} alt={exp.company} className="experience-logo" />
                    ) : (
                      <div className="experience-logo-placeholder">
                        <Building2 size={20} />
                      </div>
                    )}
                    <div>
                      <h3 className="experience-title">{exp.title}</h3>
                      <p className="experience-company">{exp.company}</p>
                    </div>
                  </div>
                  <span className="experience-type-badge">{exp.employment_type_label}</span>
                </div>
                <div className="experience-meta">
                  <span className="experience-meta-item">
                    <Calendar size={14} />
                    {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                  </span>
                  <span className="experience-meta-item">
                    <MapPin size={14} />
                    {exp.location} · {exp.location_type_label}
                  </span>
                </div>
                {exp.description && (
                  <p className="experience-description">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
