import { useAppSettings } from '../context/AppSettingsContext'
import PunchGrid from './PunchGrid'

// Progress dibaca sebagai kartu yang sedang dipunch kolom demi kolom.
export default function LoadingScreen({ progress = 0, messageKey = 'loading.portfolio' }) {
  const { t } = useAppSettings()
  const pct = Math.min(100, Math.max(0, Math.round(progress)))

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
      <div className="card card--red loading-card">
        <PunchGrid text="KEVIN FEBRIAN BIMANTARA / PORTFOLIO" cols={40} punched={Math.round((pct / 100) * 40)} />
      </div>
      <p className="loading-text">
        {t(messageKey)} <span className="loading-percent">{pct}%</span>
      </p>
    </div>
  )
}
