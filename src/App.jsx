import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

// Admin panel hanya tersedia saat development lokal.
// Tidak ikut di build production untuk GitHub Pages.
const isDev = import.meta.env.DEV
const Admin = isDev ? lazy(() => import('./pages/Admin')) : null

function AdminLazy() {
  if (!Admin) return null
  return (
    <Suspense
      fallback={
        <div className="admin-loading">
          Loading Admin...
        </div>
      }
    >
      <Admin />
    </Suspense>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
      {isDev && <Route path="/admin/*" element={<AdminLazy />} />}
    </Routes>
  )
}

export default App
