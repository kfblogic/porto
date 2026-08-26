import { GraduationCap, Calendar } from 'lucide-react'
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
        <div className="section-header">
          <span className="section-label">
            <GraduationCap size={14} />
            {t('sections.education.label')}
          </span>
          <h2 className="section-title">{t('sections.education.title')}</h2>
          <p className="section-subtitle">{t('sections.education.subtitle')}</p>
        </div>

        <div className="education-timeline">
          {educations.map((edu, index) => (
            <div key={edu.id} className="education-item glass-card" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="education-icon-wrapper">
                <GraduationCap size={24} />
              </div>
              <div className="education-content">
                <div className="education-header-row">
                  <h3 className="education-school">{edu.school}</h3>
                  <span className="education-grade">GPA: {edu.grade}</span>
                </div>
                <p className="education-degree">{edu.degree} - {edu.program}</p>
                <div className="education-date">
                  <Calendar size={14} />
                  <span>{formatDate(edu.start_date)} — {formatDate(edu.end_date)}</span>
                </div>
                {edu.description && (
                  <p className="education-description">{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
