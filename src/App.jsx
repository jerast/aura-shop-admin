import { Toaster } from 'sonner'
import { useAuthStore } from '@auth/store/useAuth.store'
import { useEffect } from 'react'
import { authToken } from '@auth/services/auth.service'
import PrivateRoutes from '@app/routes/Private.routes'
import PublicRoutes from '@app/routes/Public.routes'
import { useLocation } from 'wouter'

function App() {
  const user = useAuthStore(state => state.user)
  const login = useAuthStore(state => state.login)
  const [_, setLocation] = useLocation()

  useEffect(() => {
    (async () => {
      const tokenUser = await authToken()
      if (tokenUser.ok) {
        login(tokenUser.user)
        setLocation('/')
      }
    })()
  }, [])

  return (
    <>
      {user
        ? <PrivateRoutes /> 
        : <PublicRoutes />}
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
