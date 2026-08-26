import { useAppSettings } from '../context/AppSettingsContext'

export default function LoadingScreen({ progress = 0, messageKey = 'loading.portfolio' }) {
  const { t } = useAppSettings()
  const pct = Math.min(100, Math.max(0, Math.round(progress)))

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-progress-card glass-card">
        <div className="loading-brand">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text gradient-text">Portfolio</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <div className="loading-progress-ring" aria-hidden="true">
          <svg className="loading-progress-svg" viewBox="0 0 120 120">
            <circle className="loading-progress-track-circle" cx="60" cy="60" r="52" />
            <circle
              className="loading-progress-fill-circle"
              cx="60"
              cy="60"
              r="52"
              style={{
                strokeDasharray: `${2 * Math.PI * 52}`,
                strokeDashoffset: `${2 * Math.PI * 52 * (1 - pct / 100)}`,
              }}
            />
          </svg>
          <span className="loading-percent">{pct}%</span>
        </div>

        <div className="loading-progress-track">
          <div className="loading-progress-bar" style={{ width: `${pct}%` }} />
        </div>

        <p className="loading-text">{t(messageKey)}</p>
        <p className="loading-subtext">{pct}%</p>
      </div>
    </div>
  )
}
