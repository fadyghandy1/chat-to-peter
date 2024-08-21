import React from 'react'
import { theme } from './assets/styles/theme'
import { ThemeProvider } from '@mui/material'
import AppRoutes from './routing/AppRoutes'
import { Provider } from 'react-redux'
import store from './store/store'
import InactivityTimer from './components/common/InactivityTimer/InactivityTimer'
import FlashMessagePortal from './components/common/AppFlashMessage/FlashMessagePortal'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from './components/common/ErrorHandler/ErrorHandler.styles'
import { I18nProvider } from './i18n/i18nProvider'
import { AppI18nProvider } from './i18n/i18n'
import { RTLStyle } from './utils/rtlUtils'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AppI18nProvider>
        <I18nProvider>
          <RTLStyle>
            <ThemeProvider theme={theme}>
              <Provider store={store}>
                <ErrorBoundary
                  FallbackComponent={ErrorHandler}
                  resetKeys={['someKey']}
                  onReset={() => {
                    // reloading the page to restore the initial state
                    // of the current page

                    window.location.reload()
                  }}
                >
                  {/* <InactivityTimer /> */}
                  <AppRoutes />
                </ErrorBoundary>
                <FlashMessagePortal autoClose={true} autoCloseTime={5000} />
              </Provider>
            </ThemeProvider>
          </RTLStyle>
        </I18nProvider>
      </AppI18nProvider>
    </QueryClientProvider>
  )
}

export default App
