/**
 * Ambil field dari objek portfolio dengan fallback ke versi Indonesia.
 * Field Inggris opsional: `{field}_en` (string atau array).
 */
export function pickLocalized(obj, field, locale = 'id') {
  if (!obj) return undefined

  if (locale === 'en') {
    const enKey = `${field}_en`
    const enVal = obj[enKey]
    if (enVal != null && enVal !== '' && !(Array.isArray(enVal) && enVal.length === 0)) {
      return enVal
    }
  }

  return obj[field]
}

export function pickLocalizedProfile(profile, locale = 'id') {
  if (!profile) return profile
  return {
    ...profile,
    description: pickLocalized(profile, 'description', locale) ?? profile.description,
    headlines: pickLocalized(profile, 'headlines', locale) ?? profile.headlines,
  }
}

export function mapLocalizedList(items, fields, locale = 'id') {
  if (!items?.length) return items
  return items.map((item) => {
    const next = { ...item }
    for (const field of fields) {
      const localized = pickLocalized(item, field, locale)
      if (localized != null) next[field] = localized
    }
    return next
  })
}
