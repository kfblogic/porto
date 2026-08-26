import { useState, useEffect, useMemo, useCallback } from 'react'
import { Calendar, Flame, Award, Zap, GitCommit, ExternalLink } from 'lucide-react'
import { Octokit } from '@octokit/core'
import { useAppSettings } from '../context/AppSettingsContext'

// Original Github Icon SVG
const GithubIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
)

const loadingMessages = [
  'Connecting to GitHub API...',
  'Accessing GraphQL contribution collection gateways...',
  'Scraping contribution matrix nodes...',
  'Reconstructing contribution calendar maps...',
  'Analyzing language distribution structures...',
  'Rendering visual dashboard interface...'
]

export default function GitHubStats({ githubUrl }) {
  const { t } = useAppSettings()
  const [fetchingData, setFetchingData] = useState(true)
  const [stats, setStats] = useState(null)

  // Year selector & loading state
  const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)

  // Hover interactions
  const [hoveredLang, setHoveredLang] = useState(null)
  const [hoveredDay, setHoveredDay] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Git commits detail interaction states
  const [events, setEvents] = useState([])
  const [commits, setCommits] = useState([])
  const [loadingCommits, setLoadingCommits] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [fetchedDates, setFetchedDates] = useState([])

  // Anonymous client used as fallback when the /api/github proxy isn't available
  // (local `npm run dev` or the GitHub Pages build, which has no serverless functions).
  const anonOctokit = useMemo(() => new Octokit(), [])

  // Calls GitHub REST through the Vercel serverless proxy (token stays server-side).
  // Falls back to an anonymous direct call so dev/GitHub Pages still work, just rate-limited.
  const githubRequest = useCallback(async (path, params = {}) => {
    try {
      const search = new URLSearchParams({ path, ...params }).toString()
      const res = await fetch(`/api/github?${search}`)
      if (!res.ok) throw new Error(`proxy responded ${res.status}`)
      return { data: await res.json() }
    } catch {
      return anonOctokit.request(`GET ${path}`, {
        ...params,
        headers: { 'X-GitHub-Api-Version': '2026-03-10' },
      })
    }
  }, [anonOctokit])

  const username = useMemo(() => {
    if (!githubUrl) return null
    const usernameMatch = githubUrl.match(/github\.com\/([^/]+)/)
    return usernameMatch ? usernameMatch[1] : null
  }, [githubUrl])

  // Group commits by date from push events & search commits API
  const commitsByDate = useMemo(() => {
    const map = {}

    // 1. Populate from search commits API (which is very precise and goes back years)
    if (commits && commits.length > 0) {
      commits.forEach(item => {
        const dateStr = item.commit?.author?.date?.split('T')[0]
        if (!dateStr) return
        const repoName = item.repository?.full_name || 'unknown'
        if (!map[dateStr]) {
          map[dateStr] = []
        }
        // Avoid duplicate SHAs
        if (!map[dateStr].some(c => c.sha === item.sha)) {
          map[dateStr].push({
            sha: item.sha,
            message: item.commit.message,
            repo: repoName,
            url: item.html_url,
            time: new Date(item.commit.author.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          })
        }
      })
    }

    // 2. Also populate from recent PushEvents for the current 90 days
    if (events && events.length > 0) {
      events.forEach(event => {
        if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
          const dateStr = event.created_at.split('T')[0]
          const repoName = event.repo.name
          event.payload.commits.forEach(commit => {
            if (!map[dateStr]) {
              map[dateStr] = []
            }
            if (!map[dateStr].some(c => c.sha === commit.sha)) {
              map[dateStr].push({
                sha: commit.sha,
                message: commit.message,
                repo: repoName,
                url: `https://github.com/${repoName}/commit/${commit.sha}`,
                time: new Date(event.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              })
            }
          })
        }
      })
    }

    return map
  }, [commits, events])

  const getCommitsForDate = (dateRaw) => {
    return commitsByDate[dateRaw] || []
  }

  // Reset fetchedDates cache when year or username changes
  useEffect(() => {
    setFetchedDates([])
  }, [selectedYear, username])

  // Fetch specific date commits dynamically if selected and not cached yet
  useEffect(() => {
    if (!username || !selectedDate || selectedDate.count === 0) return

    const dateRaw = selectedDate.dateRaw
    // Skip if already in commitsByDate or already fetched in this session
    if ((commitsByDate[dateRaw] && commitsByDate[dateRaw].length > 0) || fetchedDates.includes(dateRaw)) return

    const fetchDateCommits = async () => {
      setLoadingCommits(true)
      try {
        const response = await githubRequest('/search/commits', {
          q: `author:${username} author-date:${dateRaw}`,
        })

        if (response.data.items && response.data.items.length > 0) {
          setCommits(prev => {
            const existingShas = new Set(prev.map(c => c.sha))
            const newItems = response.data.items.filter(c => !existingShas.has(c.sha))
            return [...prev, ...newItems]
          })
        }
        setFetchedDates(prev => [...prev, dateRaw])
      } catch (err) {
        console.error('Error fetching commits for date via search API:', err)
        setFetchedDates(prev => [...prev, dateRaw])
      } finally {
        setLoadingCommits(false)
      }
    }

    fetchDateCommits()
  }, [username, selectedDate, commitsByDate, fetchedDates, githubRequest])

  // Fetch detailed year-specific commits via search commits API using Octokit
  useEffect(() => {
    if (!username || !selectedYear) return

    const fetchYearCommits = async () => {
      setLoadingCommits(true)
      try {
        const response = await githubRequest('/search/commits', {
          q: `author:${username} author-date:${selectedYear}-01-01..${selectedYear}-12-31`,
          sort: 'author-date',
          order: 'desc',
          per_page: 100,
        })
        setCommits(response.data.items || [])
      } catch (err) {
        console.error('Error fetching commits via search API:', err)
      } finally {
        setLoadingCommits(false)
      }
    }

    fetchYearCommits()
  }, [username, selectedYear, githubRequest])

  // 1. Fetch entire GitHub statistics history on mount
  useEffect(() => {
    const fetchGitHubStats = async () => {
      if (!username) {
        await Promise.resolve()
        setFetchingData(false)
        return
      }
      try {
        // Fetch all contributions from the Jogruber API
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        if (!response.ok) {
          throw new Error('Contributions API response error')
        }

        const data = await response.json()
        if (data.error || !data.total || Object.keys(data.total).length === 0) {
          throw new Error('User not found or empty contribution dataset')
        }

        // Fetch repo language statistics using Octokit
        let languages = []
        try {
          const reposResponse = await githubRequest(`/users/${username}/repos`, {
            per_page: 100,
            sort: 'updated',
          })
          const reposData = reposResponse.data
          const languageStats = {}
          let totalBytes = 0

          reposData.forEach(repo => {
            if (repo.language) {
              const lang = repo.language
              const size = repo.size || 1
              languageStats[lang] = (languageStats[lang] || 0) + size
              totalBytes += size
            }
          })

          languages = Object.entries(languageStats)
            .map(([name, bytes]) => ({
              name,
              percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
              color: getLanguageColor(name)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5)
        } catch (e) {
          console.warn('Failed to load GitHub languages, using fallback', e)
        }

        // Fetch events through the proxy
        let eventsData = []
        try {
          const eventsResponse = await githubRequest(`/users/${username}/events`, {
            per_page: 100,
          })
          eventsData = eventsResponse.data
        } catch (e) {
          console.warn('Failed to load GitHub events', e)
        }
        setEvents(eventsData)

        if (languages.length === 0) {
          languages = getDefaultLanguages()
        }

        setStats({
          username: username,
          total: data.total,
          contributions: data.contributions,
          languages
        })

        const availableYears = Object.keys(data.total).sort((a, b) => b - a)
        if (availableYears.length > 0) {
          setSelectedYear(availableYears[0])
        }
      } catch (err) {
        console.warn('Failed to fetch live GitHub statistics. Generating simulated profile...', err)
        const fallback = generateFallbackStats(username)
        setStats(fallback)
        setSelectedYear('2026')
      } finally {
        setFetchingData(false)
      }
    }

    fetchGitHubStats()
  }, [username, githubRequest])

  // 2. Simulated premium loading delay when mounting or switching years
  useEffect(() => {
    if (fetchingData || !selectedYear) return

    Promise.resolve().then(() => {
      setLoading(true)
      setProgress(0)
      setLoadingTextIndex(0)
    })

    const totalDuration = 6000 // 6 seconds loading delay
    const intervalTime = 50
    const increment = 100 / (totalDuration / intervalTime)

    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += increment
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressInterval)
        setLoading(false)
      }
      setProgress(Math.min(100, Math.round(currentProgress)))

      // Map progress to current loading text step
      const step = Math.floor((currentProgress / 100) * loadingMessages.length)
      setLoadingTextIndex(Math.min(loadingMessages.length - 1, step))
    }, intervalTime)

    return () => clearInterval(progressInterval)
  }, [selectedYear, fetchingData])

  // 3. Extract and calculate stats for the selected year
  const calculatedData = useMemo(() => {
    if (!stats || !selectedYear || loading) return null

    const yearContributions = stats.contributions.filter(day => day.date.startsWith(selectedYear))
    const statsSummary = calculateYearlyStats(yearContributions)
    const weeksGrid = generateContributionGridForYear(stats.contributions, selectedYear)

    // Generate Month labels alignment indexes
    const monthLabels = []
    let lastMonth = -1
    weeksGrid.forEach((week, index) => {
      const month = parseInt(week[0].dateRaw.split('-')[1], 10)
      if (month !== lastMonth) {
        monthLabels.push({
          index,
          label: week[0].date.split(' ')[0]
        })
        lastMonth = month
      }
    })

    return {
      summary: statsSummary,
      weeks: weeksGrid,
      monthLabels
    }
  }, [stats, selectedYear, loading])

  // Years options list sorted descending
  const yearsOptions = useMemo(() => {
    if (!stats) return []
    return Object.keys(stats.total).sort((a, b) => b - a)
  }, [stats])

  // Total contribution of selected year for the ticker
  const selectedYearTotal = useMemo(() => {
    if (!stats || !selectedYear) return 0
    return stats.total[selectedYear] || 0
  }, [stats, selectedYear])

  const tickerValue = useMemo(() => {
    return Math.min(selectedYearTotal, Math.round((progress / 100) * selectedYearTotal))
  }, [selectedYearTotal, progress])

  // Handler for tooltip mouse tracking
  const handleCellMouseEnter = (day, event) => {
    setHoveredDay(day)
    setMousePos({ x: event.clientX, y: event.clientY })
  }

  const handleCellMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY })
  }

  if (fetchingData) {
    return <GitHubStatsSkeleton />
  }

  if (!stats) {
    return null
  }

  return (
    <div id="github-activity" className="container mx-auto px-4 py-16 scroll-mt-20">
      <div className="section-header text-center mb-12">
        <h2 className="section-title">{t('sections.github.title')}</h2>
        <p className="section-subtitle">{t('sections.github.subtitle')}</p>
      </div>

      {loading ? (
        /* PREMIUM FUTURISTIC LOADING PANEL */
        <div className="github-stats glass-card p-8 min-h-[440px] flex flex-col justify-center relative overflow-hidden rounded-xl border border-border-primary">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-accent-secondary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between mb-8 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary animate-spin-slow">
                <GithubIcon />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Syncing GitHub Activity</h3>
                <p className="text-xs text-text-tertiary">Resolving query schema for year {selectedYear}...</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-accent-primary font-mono tabular-nums">
                {progress}%
              </span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden mb-8 z-10 border border-border-primary">
            <div
              className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Pulsing Grid Cells Scan */}
          <div className="mb-8 overflow-hidden opacity-25 select-none z-10">
            <div className="flex gap-1.5 justify-center">
              {Array.from({ length: 24 }).map((_, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-1.5">
                  {Array.from({ length: 7 }).map((_, dIndex) => {
                    const isHighlighted = (wIndex + dIndex * 3 + Math.floor(progress / 4)) % 8 === 0
                    return (
                      <div
                        key={dIndex}
                        className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 ${isHighlighted
                          ? 'bg-accent-primary shadow-[0_0_8px_var(--color-accent-primary)] scale-110'
                          : 'bg-surface-raised'
                          }`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto z-10 font-mono">
            <span className="text-sm text-accent-secondary animate-pulse">
              &gt; {loadingMessages[loadingTextIndex]}
            </span>
            {tickerValue > 0 && (
              <span className="text-xs text-text-secondary">
                Indexed: <strong className="text-text-primary tabular-nums font-semibold">{tickerValue}</strong> contributions
              </span>
            )}
          </div>
        </div>
      ) : (
        /* MAIN DASHBOARD PANEL */
        <div className="github-stats glass-card p-6 md:p-8 rounded-xl border border-border-primary relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Header & Year Selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border-primary pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary">
                <GithubIcon />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-text-primary">GitHub Contributions</h3>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent-secondary hover:text-accent-primary flex items-center gap-0.5 transition-colors font-mono"
                  >
                    @{stats.username}
                    <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">Heatmap visualization and development streaks</p>
              </div>
            </div>

            {/* Year Selector Tabs */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full">
              {yearsOptions.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wider transition-all duration-300 ${selectedYear === year
                    ? 'bg-accent-primary text-white shadow-[0_0_12px_rgba(108,99,255,0.4)]'
                    : 'bg-surface-subtle border border-border-primary text-text-secondary hover:text-text-primary hover:border-accent-primary/50'
                    }`}
                >
                  {year} ({stats.total[year] || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Stats Summary Cards Grid */}
          {calculatedData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface-faint border border-border-primary rounded-xl p-4 flex items-center gap-3 hover:border-accent-primary/20 hover:bg-surface-subtle transition-all duration-300">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-bold">Total Contributions</p>
                  <p className="text-lg font-extrabold text-text-primary tabular-nums mt-0.5">{calculatedData.summary.total}</p>
                </div>
              </div>

              <div className="bg-surface-faint border border-border-primary rounded-xl p-4 flex items-center gap-3 hover:border-accent-primary/20 hover:bg-surface-subtle transition-all duration-300">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-bold">Longest Streak</p>
                  <p className="text-lg font-extrabold text-text-primary tabular-nums mt-0.5">{calculatedData.summary.longestStreak} days</p>
                </div>
              </div>

              <div className="bg-surface-faint border border-border-primary rounded-xl p-4 flex items-center gap-3 hover:border-accent-primary/20 hover:bg-surface-subtle transition-all duration-300">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-bold">Active Days</p>
                  <p className="text-lg font-extrabold text-text-primary tabular-nums mt-0.5">{calculatedData.summary.activeDays} days</p>
                </div>
              </div>

              <div className="bg-surface-faint border border-border-primary rounded-xl p-4 flex items-center gap-3 hover:border-accent-primary/20 hover:bg-surface-subtle transition-all duration-300">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-secondary">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-bold">Max Daily Commits</p>
                  <p className="text-lg font-extrabold text-text-primary tabular-nums mt-0.5">{calculatedData.summary.maxCount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Heatmap Contribution Matrix */}
          {calculatedData && (
            <div className="border-t border-border-primary pt-6 mb-8">
              <h4 className="text-sm font-bold text-text-secondary mb-4">Contribution Matrix</h4>

              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="relative flex flex-col min-w-max">
                  {/* Month Headers */}
                  <div className="flex text-[9px] text-text-tertiary mb-2 ml-7 h-4 relative select-none font-mono">
                    {calculatedData.monthLabels.map((m, i) => (
                      <span
                        key={i}
                        className="absolute"
                        style={{ left: `${m.index * 15}px` }} // w-3 (12px) + gap-1 (3px) = 15px
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  {/* Grid layout with weekday labels */}
                  <div className="flex gap-2">
                    <div className="flex flex-col justify-between text-[9px] text-text-tertiary h-[102px] py-[2px] w-5 pr-1 select-none font-mono">
                      <span></span>
                      <span>Mon</span>
                      <span></span>
                      <span>Wed</span>
                      <span></span>
                      <span>Fri</span>
                      <span></span>
                    </div>

                    <div className="flex gap-[3px]">
                      {calculatedData.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                          {week.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-[2px] transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${selectedDate && selectedDate.dateRaw === day.dateRaw
                                ? 'ring-2 ring-accent-primary scale-115 z-30 shadow-[0_0_8px_rgba(108,99,255,0.8)]'
                                : ''
                                } ${day.level === 0
                                  ? 'bg-surface-subtle'
                                  : day.level === 1
                                    ? 'bg-accent-primary/20 hover:shadow-[0_0_6px_rgba(108,99,255,0.4)]'
                                    : day.level === 2
                                      ? 'bg-accent-primary/45 hover:shadow-[0_0_8px_rgba(108,99,255,0.6)]'
                                      : day.level === 3
                                        ? 'bg-accent-primary/75 hover:shadow-[0_0_10px_rgba(108,99,255,0.8)]'
                                        : 'bg-accent-primary hover:shadow-[0_0_12px_rgba(108,99,255,1)]'
                                }`}
                              onMouseEnter={(e) => handleCellMouseEnter(day, e)}
                              onMouseMove={handleCellMouseMove}
                              onMouseLeave={() => setHoveredDay(null)}
                              onClick={() => setSelectedDate(day)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend & Details footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary mt-4 font-mono select-none">
                <div>
                  <span>Data cached and loaded via Secure API endpoints</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-[2px] bg-surface-subtle" />
                  <div className="w-3 h-3 rounded-[2px] bg-accent-primary/20" />
                  <div className="w-3 h-3 rounded-[2px] bg-accent-primary/45" />
                  <div className="w-3 h-3 rounded-[2px] bg-accent-primary/75" />
                  <div className="w-3 h-3 rounded-[2px] bg-accent-primary" />
                  <span>More</span>
                </div>
              </div>

              {/* Commit Details Panel */}
              <div className="border-t border-border-primary pt-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-text-secondary">
                    Commit Activity Details
                  </h4>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-xs text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {!selectedDate ? (
                  <div className="bg-surface-faint border border-dashed border-border-primary rounded-xl p-6 text-center text-xs text-text-secondary select-none">
                    💡 Click any square in the contribution matrix above to inspect detailed commit activity for that day.
                  </div>
                ) : (
                  <div className="bg-surface-faint border border-border-primary rounded-xl p-5 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-xs font-mono text-accent-secondary font-bold uppercase tracking-wider">
                          {selectedDate.date}
                        </span>
                        <h5 className="text-base font-bold text-text-primary mt-0.5">
                          {selectedDate.count === 0
                            ? 'No contributions recorded'
                            : `${selectedDate.count} contribution${selectedDate.count > 1 ? 's' : ''} recorded`}
                        </h5>
                      </div>

                      {selectedDate.count > 0 && username && (
                        <a
                          href={`https://github.com/${username}?tab=overview&from=${selectedDate.dateRaw}&to=${selectedDate.dateRaw}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-surface-raised hover:bg-accent-primary/20 border border-border-primary hover:border-accent-primary/40 text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 transition-all self-start sm:self-center"
                        >
                          <span>{t('sections.github.viewOnGithub')}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {selectedDate.count > 0 ? (
                      <div className="space-y-3">
                        {loadingCommits ? (
                          <div className="flex flex-col items-center justify-center p-8 bg-bg-primary/30 border border-border-primary/40 rounded-lg">
                            <div className="w-8 h-8 rounded-full border-2 border-accent-secondary border-t-transparent animate-spin mb-3" />
                            <span className="text-xs text-text-secondary font-mono animate-pulse">{t('sections.github.loadingCommits')}</span>
                          </div>
                        ) : getCommitsForDate(selectedDate.dateRaw).length > 0 ? (
                          getCommitsForDate(selectedDate.dateRaw).map((commit, idx) => (
                            <div
                              key={commit.sha || idx}
                              className="flex items-start justify-between gap-4 p-3 rounded-lg bg-bg-primary/50 border border-border-primary/50 hover:border-accent-primary/20 transition-colors"
                            >
                              <div className="flex items-start gap-2.5">
                                <div className="mt-0.5 shrink-0 text-accent-secondary">
                                  <GitCommit size={16} />
                                </div>
                                <div>
                                  {commit.url ? (
                                    <a
                                      href={commit.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-sm font-medium text-text-primary hover:text-accent-secondary transition-colors break-words"
                                    >
                                      {commit.message}
                                    </a>
                                  ) : (
                                    <p className="text-sm font-medium text-text-primary break-words">
                                      {commit.message}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-tertiary mt-1.5 font-mono">
                                    <span className="text-accent-secondary font-semibold">
                                      {commit.repo}
                                    </span>
                                    {commit.sha && (
                                      <span>
                                        SHA: {commit.sha.substring(0, 7)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {commit.time && (
                                <span className="text-xs text-text-tertiary shrink-0 font-mono">
                                  {commit.time}
                                </span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-text-secondary leading-relaxed p-4 rounded-lg bg-bg-primary/30 border border-border-primary/40">
                            <p>
                              Commit details for this date are not available in the public events stream.
                            </p>
                            <p className="text-text-tertiary mt-1 font-sans">
                              GitHub API public events are restricted to the last 90 days. Contributions on this day may also represent issues, PR discussions, wiki edits, or private repository activity.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-text-tertiary">
                        No developer logs are available for days with zero contributions.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Top Languages Section */}
          <div className="border-t border-border-primary pt-6">
            <h4 className="text-sm font-bold text-text-secondary mb-4">Top Languages on GitHub</h4>

            {/* Multi-segmented Linear Bar */}
            <div className="w-full h-3 bg-surface-subtle rounded-full overflow-hidden flex mb-4 border border-border-primary">
              {stats.languages.map((lang, index) => (
                <div
                  key={index}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                    opacity: hoveredLang === null || hoveredLang === index ? 1 : 0.4,
                    boxShadow: hoveredLang === index ? `0 0 10px ${lang.color}` : 'none',
                    transform: hoveredLang === index ? 'scaleY(1.25)' : 'none',
                    zIndex: hoveredLang === index ? 10 : 1
                  }}
                  className="h-full transition-all duration-300 cursor-pointer origin-center"
                  onMouseEnter={() => setHoveredLang(index)}
                  onMouseLeave={() => setHoveredLang(null)}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Languages Legends Badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
              {stats.languages.map((lang, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs font-semibold tracking-wider font-mono cursor-pointer transition-all duration-200 ${hoveredLang === null || hoveredLang === index
                    ? 'text-text-secondary hover:text-text-primary'
                    : 'text-text-tertiary opacity-60'
                    }`}
                  onMouseEnter={() => setHoveredLang(index)}
                  onMouseLeave={() => setHoveredLang(null)}
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                  <span>{lang.name}</span>
                  <span className="text-text-tertiary">({lang.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Tooltip following cursor */}
      {hoveredDay && (
        <div
          className="fixed z-[3000] px-4 py-3 bg-bg-secondary/95 backdrop-blur-md border border-border-primary rounded-lg shadow-2xl text-xs w-[240px] pointer-events-none transition-all duration-75 font-mono border-l-4 border-l-accent-primary"
          style={{
            left: `${mousePos.x + 15 + 240 > window.innerWidth ? mousePos.x - 255 : mousePos.x + 15}px`,
            top: `${mousePos.y + 15 + 125 > window.innerHeight ? mousePos.y - 140 : mousePos.y + 15}px`,
          }}
        >
          <p className="font-bold text-text-primary mb-1 text-[11px]">{hoveredDay.date}</p>
          <p className="text-text-secondary text-[11px] mt-1">
            <span className="text-accent-secondary font-bold text-sm">{hoveredDay.count}</span> contributions
          </p>
          {hoveredDay.count > 0 && (
            <div className="mt-2.5 pt-2 border-t border-border-primary text-[10px] text-text-tertiary flex items-center gap-1.5">
              <GitCommit size={12} className="text-accent-primary" />
              <span>Commits & PRs index active</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* HELPER FUNCTIONS */

function generateContributionGridForYear(contributions, year) {
  const yearInt = parseInt(year, 10)

  // Find Sunday on or before Jan 1st of that year
  const startDate = new Date(yearInt, 0, 1)
  const startDay = startDate.getDay() // 0 = Sun, 1 = Mon ...
  startDate.setDate(startDate.getDate() - startDay)

  // Find Saturday on or after Dec 31st of that year
  const endDate = new Date(yearInt, 11, 31)
  const endDay = endDate.getDay()
  endDate.setDate(endDate.getDate() + (6 - endDay))

  // Create a map for quick lookup
  const contribMap = new Map()
  contributions.forEach(c => {
    contribMap.set(c.date, c)
  })

  const weeks = []
  let currentWeek = []

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayData = contribMap.get(dateStr) || { count: 0, level: 0 }

    currentWeek.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dateRaw: dateStr,
      count: dayData.count,
      level: dayData.level || 0
    })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

function calculateYearlyStats(yearContributions) {
  let total = 0
  let activeDays = 0
  let maxCount = 0
  let longestStreak = 0
  let currentStreak = 0

  // Sort contributions by date ascending
  const sorted = [...yearContributions].sort((a, b) => new Date(a.date) - new Date(b.date))

  sorted.forEach(day => {
    total += day.count
    if (day.count > 0) {
      activeDays += 1
      currentStreak += 1
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak
      }
      if (day.count > maxCount) {
        maxCount = day.count
      }
    } else {
      currentStreak = 0
    }
  })

  return {
    total,
    activeDays,
    longestStreak,
    maxCount
  }
}

function generateFallbackStats(username) {
  const years = ['2026', '2025', '2024', '2023']
  const total = {
    '2026': 184,
    '2025': 1248,
    '2024': 1485,
    '2023': 952
  }

  const contributions = []

  years.forEach(yearStr => {
    const year = parseInt(yearStr, 10)
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)

    // Seeded pseudo-random generator
    let seed = year
    const random = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0]

      const rand = random()
      let count = 0
      let level = 0

      if (rand > 0.82) {
        count = Math.floor(random() * 8) + 4
        level = count > 8 ? 4 : 3
      } else if (rand > 0.58) {
        count = Math.floor(random() * 3) + 1
        level = count > 2 ? 2 : 1
      }

      contributions.push({
        date: dateStr,
        count,
        level
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }
  })

  return {
    username: username || 'Developer',
    total,
    contributions,
    languages: getDefaultLanguages()
  }
}

function getDefaultLanguages() {
  return [
    { name: 'JavaScript', percentage: 42, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 28, color: '#3178c6' },
    { name: 'React/JSX', percentage: 18, color: '#61dafb' },
    { name: 'Node.js', percentage: 8, color: '#339933' },
    { name: 'CSS/HTML', percentage: 4, color: '#e34c26' }
  ]
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4f5d95',
    Ruby: '#701516',
    Go: '#00add8',
    Rust: '#dea584',
    Swift: '#f05138',
    Kotlin: '#a97bff',
    Dart: '#0175c2',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#41b883',
    React: '#61dafb',
    Laravel: '#ff2d20',
    Node: '#339933',
    SQL: '#cc2927',
    PostgreSQL: '#336791',
    MongoDB: '#47a248',
    Docker: '#2496ed',
  }
  return colors[language] || '#8b949e'
}

function GitHubStatsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="github-stats glass-card p-8 rounded-xl border border-border-primary">
        <div className="flex items-center gap-2 mb-5">
          <div className="skeleton w-5 h-5 rounded animate-pulse" />
          <div className="skeleton w-32 h-6 rounded animate-pulse" />
        </div>

        <div className="mb-6">
          <div className="skeleton w-48 h-4 mb-4 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton w-24 h-8 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        <div className="border-t border-border-primary pt-5">
          <div className="skeleton w-40 h-4 mb-4 rounded animate-pulse" />
          <div className="skeleton w-full h-32 rounded animate-pulse" />
          <div className="skeleton w-56 h-4 mx-auto mt-3 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
