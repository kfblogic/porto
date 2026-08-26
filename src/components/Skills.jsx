import { Cpu } from 'lucide-react'
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
        <div className="section-header animate-fadeInUp">
          <span className="section-label">
            <Cpu size={14} />
            {t('sections.skills.label')}
          </span>
          <h2 className="section-title">{t('sections.skills.title')}</h2>
          <p className="section-subtitle">{t('sections.skills.subtitle')}</p>
        </div>

        <div className="skills-flat-list">
          {skills.map((item, idx) => {
            const { svg: iconSvg, variant } = getSkillIconData(item.skill, item.svg)
            return (
              <div 
                key={item.id} 
                className="skill-flat-badge animate-fadeInUp" 
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
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

