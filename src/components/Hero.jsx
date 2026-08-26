import { useState, useEffect } from 'react'
import { ChevronDown, Mail, Eye } from 'lucide-react'
import CVModal from './CVModal'
import { useAppSettings } from '../context/AppSettingsContext'

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
)
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
)
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
)
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
)

export default function Hero({ profile }) {
  const { t } = useAppSettings()
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)

  const headlines = profile?.headlines || ['Developer']

  useEffect(() => {
    const current = headlines[currentHeadline]
    let timeout

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length - 1))
        }, 40)
      } else {
        setIsDeleting(false)
        setCurrentHeadline((prev) => (prev + 1) % headlines.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentHeadline, headlines])

  const socialLinks = [
    { icon: GithubIcon, url: profile?.github_url, label: 'GitHub' },
    { icon: LinkedinIcon, url: profile?.linkedin_url, label: 'LinkedIn' },
    { icon: InstagramIcon, url: profile?.instagram_url, label: 'Instagram' },
    { icon: TwitterIcon, url: profile?.twitter_url, label: 'Twitter' },
  ].filter(s => s.url)

  return (
    <section id="home" className="hero">
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="hero-bg-orb hero-bg-orb-3" />

      <div className="container hero-container">
        <div className="hero-content animate-fadeInUp">


          <div className="hero-greeting">
            <span className="greeting-line" />
            <span className="greeting-text">{t('hero.greeting')}</span>
          </div>

          <h1 className="hero-name">{profile?.name || 'Developer'}</h1>

          <div className="hero-headline">
            <span className="headline-text">{displayText}</span>
            <span className="headline-cursor">|</span>
          </div>

          <p className="hero-description">
            {profile?.description || 'A passionate developer building amazing things.'}
          </p>

          <div className="hero-actions">
            {profile?.cv_path && (
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="btn btn-primary"
              >
                <Eye size={18} />
                {t('hero.viewCv')}
              </button>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="btn btn-outline">
                <Mail size={18} />
                {t('hero.contact')}
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="hero-socials">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="hero-visual animate-slideInRight delay-2">
          <div className="hero-avatar-wrapper">
            {profile?.photo ? (
              <img src={profile.photo} alt={profile.name} className="hero-avatar" />
            ) : (
              <div className="hero-avatar-placeholder">
                <span>{(profile?.name || 'D')[0]}</span>
              </div>
            )}
            <div className="hero-avatar-ring" />
            <div className="hero-avatar-dot" />
          </div>
        </div>
      </div>

      <a href="#activities" className="hero-scroll-indicator" onClick={(e) => {
        e.preventDefault()
        document.querySelector('#activities')?.scrollIntoView({ behavior: 'smooth' })
      }}>
        <span className="scroll-text">{t('hero.scrollDown')}</span>
        <ChevronDown size={18} className="scroll-icon" />
      </a>

      <CVModal
        cvPath={profile?.cv_path}
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </section>
  )
}
