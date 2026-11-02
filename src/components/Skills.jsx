import { useScrollReveal } from '../hooks/useScrollReveal'
import { getSkillIconData } from '../lib/techIcons'
import { useAppSettings } from '../context/AppSettingsContext'

export default function Skills({ skills }) {
  const { t } = useAppSettings()
  const ref = useScrollReveal()

  if (!skills || skills.length === 0) return null

  return (
    <section id="skills" className="section">
      <div className="container" ref={ref}>
        <div className="section-header">
          <h2 className="section-title">{t('sections.skills.title')}</h2>
          <p className="section-subtitle">{t('sections.skills.subtitle')}</p>
        </div>

        <div className="skills-flat-list">
          {skills.map((item) => {
            const { svg: iconSvg, variant } = getSkillIconData(item.skill, item.svg)
            return (
              <div key={item.id} className="skill-flat-badge">
                <span
                  className={`skill-flat-icon skill-flat-icon--${variant}`}
                  dangerouslySetInnerHTML={{ __html: iconSvg }}
                />
                <span className="skill-flat-name">{item.skill}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

