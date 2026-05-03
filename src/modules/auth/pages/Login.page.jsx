import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import AuraLogo from '@app/components/AuraLogo'
import useAuth from '@auth/hooks/useAuth'

function LoginPage () {
  const {
    email,
    password,
    error,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit
  } = useAuth()

  return (
    <section className="px-6 py-8 sm:px-10 sm:py-12">
      <div className="flex justify-center mb-8">
        <AuraLogo className="w-32 h-auto text-primary" />
      </div>

      <div>
        <h1 className="font-serif text-4xl text-foreground">Iniciar sesion</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Ingresa con tus credenciales de administrador para entrar al panel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Correo</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@gmail.com"
              className="w-full rounded-xl border border-input bg-background px-11 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Contrasena</label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contrasena"
              className="w-full rounded-xl border border-input bg-background px-11 py-3 pr-12 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Entrar al panel
        </button>
      </form>
    </section>
  )
}

export default LoginPage
