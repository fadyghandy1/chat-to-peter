import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import { useMemo } from 'react'
import { useLang } from '../i18n/i18n'

const createRtlCache = (lang) => {
  const plugin = lang === 'ar' ? [rtlPlugin] : []
  return createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, ...plugin],
  })
}
export const RTLStyle = (props) => {
  const lang = useLang()

  // Memoize the cache creation to avoid unnecessary re-renders
  const cacheRtl = useMemo(() => createRtlCache(lang), [lang])

  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    document.documentElement.setAttribute('direction', 'rtl')
    document.documentElement.setAttribute('style', 'direction:rtl')
  } else {
    document.documentElement.removeAttribute('dir')
    document.documentElement.removeAttribute('direction')
    document.documentElement.removeAttribute('style')
    document.documentElement.setAttribute('lang', 'en')
  }

  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
}
