import './assets/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './config/router.config'
import { AuthProvider } from './context/auth.context'
import { RideContextProvider } from './context/ride.context'
import { ThemeProvider } from './config/theme.provider'
import StackedNotifications from './components/notification/notification'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ThemeProvider>
      <StackedNotifications >
      <AuthProvider>
        <RideContextProvider>
          <Routing />
        </RideContextProvider>
      </AuthProvider>
      </StackedNotifications>
    </ThemeProvider>
  </StrictMode>,
)
