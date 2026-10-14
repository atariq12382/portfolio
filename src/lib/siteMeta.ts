import { siteMeta } from '@/data/siteMeta'

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applySiteMeta() {
  document.title = siteMeta.title

  upsertMeta('name', 'description', siteMeta.description)

  const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
  const ogImage = base
    ? `${base}${siteMeta.ogImagePath}`
    : siteMeta.ogImagePath

  upsertMeta('property', 'og:title', siteMeta.title)
  upsertMeta('property', 'og:description', siteMeta.description)
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('name', 'twitter:title', siteMeta.title)
  upsertMeta('name', 'twitter:description', siteMeta.description)
  upsertMeta('name', 'twitter:image', ogImage)

  if (base) {
    upsertMeta('property', 'og:url', base)
    upsertMeta('property', 'og:site_name', siteMeta.author)
  }
}
