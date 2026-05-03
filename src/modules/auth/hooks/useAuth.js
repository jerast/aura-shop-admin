import { authLogin } from '@auth/services/auth.service'
import { useAuthStore } from '@auth/store/useAuth.store'
import { useState } from 'react'
import { toast } from 'sonner'
import { useLocation } from 'wouter'

function useAuth () {
  const [_, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useAuthStore(state => state.login)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await authLogin({ email, password })

    if (!data.ok) {
      setError(data?.message)
      toast.error(data?.message)
      return
    }

    setError('')
    setLocation('/')
    login(data.user)
  }

  return {
    email,
    password,
    error,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit
  }
}

export default useAuth
