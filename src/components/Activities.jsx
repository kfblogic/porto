import { useScrollReveal } from '../hooks/useScrollReveal'
import { useAppSettings } from '../context/AppSettingsContext'

export default function Activities({ activities }) {
  const { t } = useAppSettings()
  const ref = useScrollReveal()

  if (!activities || activities.length === 0) return null

  return (
    <section id="activities" className="section">
      <div className="container" ref={ref}>
        <div className="card-wrap">
          <div className="card card--blue" data-seq="KFB 0003">
            <div className="section-header">
              <h2 className="section-title">{t('sections.activities.title')}</h2>
              <p className="section-subtitle">{t('sections.activities.subtitle')}</p>
            </div>

            <div className="activities-grid">
              {activities.map((activity, index) => (
                <div key={activity.id} className="activity-card" style={{ animationDelay: `${index * 0.15}s` }}>
                  <h3 className="activity-heading">{activity.heading}</h3>
                  <p className="activity-caption">{activity.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
