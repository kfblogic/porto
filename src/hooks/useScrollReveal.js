import { useEffect, useRef } from 'react'

// Menandai section saat tiba di layar; CSS menjatuhkan judulnya sekali seperti flap.
export function useScrollReveal(ready = true) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !ready) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('has-arrived')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ready])

  return ref
}
