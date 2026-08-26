import { useEffect, useState } from 'react'
import { loadPortfolioData } from '../lib/portfolioData'

/**
 * Memuat portfolio.json sambil menaikkan progress simulasi (0–100%).
 */
export function usePortfolioLoader() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    let finished = false
    let rafId = 0
    const start = performance.now()

    const tick = () => {
      if (!mounted || finished) return
      const elapsed = performance.now() - start
      const simulated = Math.min(92, 6 + elapsed / 28)
      setProgress((p) => (simulated > p ? simulated : p))
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    loadPortfolioData()
      .then((json) => {
        if (!mounted) return
        finished = true
        setProgress(100)
        window.setTimeout(() => {
          if (!mounted) return
          setData(json)
          setLoading(false)
        }, 400)
      })
      .catch((err) => {
        console.error('Failed to load portfolio data:', err)
        if (!mounted) return
        finished = true
        setProgress(100)
        setError(true)
        setLoading(false)
      })

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { data, loading, progress, error }
}
