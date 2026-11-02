import { useAppSettings } from '../context/AppSettingsContext'

// Progress dibaca sebagai tiga flap angka di papan.
export default function LoadingScreen({ progress = 0, messageKey = 'loading.portfolio' }) {
  const { t } = useAppSettings()
  const pct = Math.min(100, Math.max(0, Math.round(progress)))

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
      <div className="loading-flaps" aria-hidden="true">
        {[...String(pct).padStart(3, '0')].map((digit, i) => (
          <span key={i} className="loading-flap">{digit}</span>
        ))}
      </div>
      <p className="loading-text">
        {t(messageKey)} <span className="loading-percent">{pct}%</span>
      </p>
    </div>
  )
}
