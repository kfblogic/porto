import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Languages } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'

const navLinkIds = [
  { key: 'nav.home', id: 'home' },
  { key: 'nav.skills', id: 'skills' },
  { key: 'nav.activities', id: 'activities' },
  { key: 'nav.projects', id: 'projects' },
  { key: 'nav.education', id: 'education' },
  { key: 'nav.experience', id: 'experience' },
]

function isHomePath(pathname) {
  return pathname === '/' || pathname === ''
}

function NavbarControls({ className = '' }) {
  const { locale, theme, toggleLocale, toggleTheme, t } = useAppSettings()

  return (
    <div className={`navbar-actions ${className}`.trim()}>
      <button
        type="button"
        className="navbar-control-btn"
        onClick={toggleLocale}
        aria-label={t('nav.lang')}
        title={t('nav.lang')}
      >
        <Languages size={16} aria-hidden />
        <span className="navbar-control-label">{locale === 'id' ? 'EN' : 'ID'}</span>
      </button>
      <button
        type="button"
        className={`navbar-control-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
        title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
      >
        {theme === 'dark' ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
        <span className="navbar-control-label">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      </button>
    </div>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useAppSettings()
  const isHome = isHomePath(location.pathname)

  const navLinks = useMemo(
    () => navLinkIds.map((link) => ({ ...link, label: t(link.key) })),
    [t],
  )

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (!isHome) return undefined

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.id)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome, navLinks])

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const goToSection = (sectionId) => {
    setMobileOpen(false)
    if (isHome) {
      scrollToSection(sectionId)
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    goToSection(sectionId)
  }

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      goToSection('home')
    } else {
      setMobileOpen(false)
    }
  }

  const navbarClass = !isHome
    ? 'navbar navbar-solid'
    : `navbar ${scrolled ? 'navbar-scrolled' : ''}`

  return (
    <nav className={navbarClass}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={handleLogoClick}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">Portfolio</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'active' : ''}`}>
          <NavbarControls className="navbar-mobile-controls" />
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${isHome && activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
              <span className="nav-link-indicator" />
            </a>
          ))}
        </div>

        <NavbarControls />

        <button
          type="button"
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t('nav.toggleMenu')}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  )
}
