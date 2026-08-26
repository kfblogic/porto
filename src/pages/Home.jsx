import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Activities from '../components/Activities'
import GitHubStats from '../components/GitHubStats'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import Skills from '../components/Skills'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import LoadingScreen from '../components/LoadingScreen'
import { useAppSettings } from '../context/AppSettingsContext'
import { usePortfolioLoader } from '../hooks/usePortfolioLoader'
import { mapLocalizedList, pickLocalizedProfile } from '../lib/localized'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, t } = useAppSettings()
  const { data, loading, progress, error } = usePortfolioLoader()

  const localized = useMemo(() => {
    if (!data) return null
    return {
      profile: pickLocalizedProfile(data.profile, locale),
      skills: data.skills,
      activities: mapLocalizedList(data.activities, ['heading', 'caption'], locale),
      projects: mapLocalizedList(data.projects, ['name', 'excerpt', 'category'], locale),
      categories: data.categories,
      educations: mapLocalizedList(data.educations, ['school', 'degree', 'description'], locale),
      experiences: mapLocalizedList(data.experiences, ['title', 'company', 'description'], locale),
      certifications: mapLocalizedList(
        data.certifications,
        ['name', 'issuer', 'credential_id'],
        locale,
      ),
    }
  }, [data, locale])

  useEffect(() => {
    const sectionId = location.state?.scrollTo
    if (!sectionId || loading) return

    const timer = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      navigate(location.pathname, { replace: true, state: {} })
    }, 100)

    return () => window.clearTimeout(timer)
  }, [location.state?.scrollTo, loading, location.pathname, navigate])

  if (loading) {
    return <LoadingScreen progress={progress} messageKey="loading.portfolio" />
  }

  if (error || !localized) {
    return (
      <div className="loading-screen">
        <p className="loading-text">{t('loading.failed')}</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero profile={localized.profile} skills={localized.skills} />
        <Skills skills={localized.skills} />
        <Activities activities={localized.activities} />
        <GitHubStats githubUrl={localized.profile?.github_url} />
        <Projects
          projects={localized.projects}
          categories={localized.categories}
        />
        <Education educations={localized.educations} />
        <Experience experiences={localized.experiences} />
        <Certifications certifications={localized.certifications} />
      </main>

      <Footer profile={localized.profile} />
      <ScrollToTop />
    </>
  )
}
