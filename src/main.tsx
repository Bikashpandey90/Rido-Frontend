import './assets/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './config/router.config'
import { AuthProvider } from './context/auth.context'
import { RideContextProvider } from './context/ride.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RideContextProvider>
        <Routing />
      </RideContextProvider>
    </AuthProvider>
  </StrictMode>,
)
