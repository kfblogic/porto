import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, FolderOpen, GraduationCap,
  Building2, Award, Cpu, Save, ArrowLeft, Activity, Rocket
} from 'lucide-react'
import ProfileEditor from '../admin/ProfileEditor'
import ActivitiesEditor from '../admin/ActivitiesEditor'
import ProjectsEditor from '../admin/ProjectsEditor'
import ExperienceEditor from '../admin/ExperienceEditor'
import EducationEditor from '../admin/EducationEditor'
import CertificationsEditor from '../admin/CertificationsEditor'
import SkillsEditor from '../admin/SkillsEditor'
import { loadPortfolioData } from '../lib/portfolioData'
import { savePortfolioJson } from '../lib/uploadAsset'

export default function Admin() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadPortfolioData()
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load portfolio data:', err)
        setLoading(false)
        setMessage({
          type: 'error',
          text: 'Gagal memuat data. Pastikan public/data/portfolio.json ada. Buka admin via /#/admin (bukan /admin).',
        })
      })
  }, [])

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    try {
      await savePortfolioJson(data)
      setMessage({
        type: 'success',
        text: 'Tersimpan ke public/data/portfolio.json. Commit file JSON + folder public/assets/ lalu npm run deploy.',
      })
    } catch (err) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'portfolio.json'
      a.click()
      URL.revokeObjectURL(a.href)
      setMessage({
        type: 'success',
        text: err.message || 'Downloaded portfolio.json — simpan manual ke public/data/',
      })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 10000)
    }
  }

  const handleCopy = () => {
    if (!data) return
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setMessage({ type: 'success', text: 'JSON copied to clipboard!' })
    setTimeout(() => setMessage(null), 3000)
  }

  if (loading) return <div className="admin-loading">Loading...</div>

  const navItems = [
    { path: '/admin', icon: User, label: 'Profile', end: true },
    { path: '/admin/activities', icon: Activity, label: 'Activities' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/admin/education', icon: GraduationCap, label: 'Education' },
    { path: '/admin/experience', icon: Building2, label: 'Experience' },
    { path: '/admin/certifications', icon: Award, label: 'Certifications' },
    { path: '/admin/skills', icon: Cpu, label: 'Skills' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <LayoutDashboard size={24} />
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button type="button" className="btn btn-outline admin-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            <span>View Site</span>
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-page-title">Portfolio Admin</h1>
          <div className="admin-actions">
            <button type="button" className="btn btn-outline" onClick={handleCopy} disabled={!data}>
              Copy JSON
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving || !data}>
              <Save size={16} />
              {saving ? 'Menyimpan...' : 'Simpan JSON'}
            </button>
          </div>
        </header>
        {message && <div className={`admin-message ${message.type}`}>{message.text}</div>}
        <div className="admin-content">
          {data ? (
            <Routes>
              <Route index element={<ProfileEditor data={data} onChange={setData} />} />
              <Route path="activities" element={<ActivitiesEditor data={data} onChange={setData} />} />
              <Route path="projects" element={<ProjectsEditor data={data} onChange={setData} />} />
              <Route path="education" element={<EducationEditor data={data} onChange={setData} />} />
              <Route path="experience" element={<ExperienceEditor data={data} onChange={setData} />} />
              <Route path="certifications" element={<CertificationsEditor data={data} onChange={setData} />} />
              <Route path="skills" element={<SkillsEditor data={data} onChange={setData} />} />
            </Routes>
          ) : (
            <p className="text-text-secondary">Tidak ada data untuk diedit. Periksa file portfolio.json.</p>
          )}
        </div>
        <div className="deploy-card">
          <div className="deploy-header">
            <Rocket size={20} />
            <h3>Deploy ke GitHub Pages (tanpa Admin)</h3>
          </div>
          <ol className="deploy-steps">
            <li>Upload gambar/PDF di admin → file masuk <code>public/assets/portfolio/</code>, JSON hanya berisi path (bukan base64)</li>
            <li>Klik <strong>Simpan JSON</strong> (menulis <code>public/data/portfolio.json</code>)</li>
            <li>Commit & push: <code>public/assets/</code> + <code>public/data/portfolio.json</code></li>
            <li><code>npm run deploy</code> — aset ikut ke <code>dist/</code>, aman untuk GitHub Pages</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
