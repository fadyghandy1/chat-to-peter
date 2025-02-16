//eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY

// {
//   selectedLang: 'ar' | 'en'
// }
const initialState = {
  selectedLang: 'en',
}

function getConfig() {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)

  if (ls) {
    try {
      return JSON.parse(ls)
    } catch (er) {
      console.error(er)
    }
  }
  return initialState
}

// Side effect
export function setLanguage(lang) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }))
  window.location.reload()
}

const I18nContext = createContext(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang
}

const AppI18nProvider = ({ children }) => {
  const lang = getConfig()

  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>
}

export { AppI18nProvider, useLang }
