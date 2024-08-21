import { useLang } from './i18n'
import { IntlProvider } from 'react-intl'
// import '@formatjs/intl-relativetimeformat/polyfill'
// import '@formatjs/intl-relativetimeformat/locale-data/en'
// import '@formatjs/intl-relativetimeformat/locale-data/ar'

import arMessages from './messages/ar.json'
import enMessages from './messages/en.json'

const allMessages = {
  ar: arMessages,
  en: enMessages,
}

const I18nProvider = ({ children }) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export { I18nProvider }
