import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALES, STORAGE_KEYS, THEMES, translate } from '../lib/i18n'

const AppSettingsContext = createContext(null)

function readStored(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key)
    return allowed.includes(value) ? value : fallback
  } catch {
    return fallback
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark'
}

function applyLocale(locale) {
  document.documentElement.lang = locale === 'en' ? 'en' : 'id'
}

export function AppSettingsProvider({ children }) {
  const [locale, setLocaleState] = useState(() =>
    readStored(STORAGE_KEYS.locale, LOCALES, 'id'),
  )
  const [theme, setThemeState] = useState(() =>
    readStored(STORAGE_KEYS.theme, THEMES, 'dark'),
  )

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    applyLocale(locale)
    try {
      localStorage.setItem(STORAGE_KEYS.locale, locale)
    } catch {
      /* ignore */
    }
  }, [locale])

  const setLocale = useCallback((next) => {
    setLocaleState((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      return LOCALES.includes(value) ? value : prev
    })
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      return THEMES.includes(value) ? value : prev
    })
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale((l) => (l === 'id' ? 'en' : 'id'))
  }, [setLocale])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const t = useCallback((key, vars) => translate(locale, key, vars), [locale])

  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      setTheme,
      toggleLocale,
      toggleTheme,
      t,
    }),
    [locale, theme, setLocale, setTheme, toggleLocale, toggleTheme, t],
  )

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext)
  if (!ctx) {
    throw new Error('useAppSettings must be used within AppSettingsProvider')
  }
  return ctx
}
