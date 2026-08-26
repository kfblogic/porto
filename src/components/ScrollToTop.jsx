import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'

export default function ScrollToTop() {
  const { t } = useAppSettings()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      aria-label={t('scrollTop')}
    >
      <ArrowUp size={20} />
    </button>
  )
}
