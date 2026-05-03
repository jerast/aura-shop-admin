import { useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import { toast } from "sonner"
import AuraLogo from "@app/components/AuraLogo"

function LoginPage () {
  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    const success = login(email, password)

    if (!success) {
      const nextError = "Correo o contrasena incorrectos"
      setError(nextError)
      toast.error(nextError)
      return
    }

    setError("")
    toast.success("Bienvenido al panel de administracion")
    router.replace(nextPath)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(109,40,217,0.15),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(248,248,251,1))]" />
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-accent blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-border bg-card/90 shadow-[0_30px_100px_rgba(24,24,27,0.12)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden border-r border-border bg-sidebar px-10 py-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <AuraLogo className="w-32 h-auto text-primary" />
              <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Admin Access</p>
            </div>

            <div>
              <p className="max-w-md font-serif text-4xl leading-tight text-foreground">
                Administra tu tienda con una entrada simple y elegante.
              </p>
              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                Este acceso es temporal y valida un unico usuario administrador mientras terminamos la autenticacion completa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-background/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Usuario</p>
                <p className="mt-2 text-sm font-medium text-foreground">admin@gmail.com</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Contrasena</p>
                <p className="mt-2 text-sm font-medium text-foreground">admin123</p>
              </div>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="mx-auto flex w-full max-w-md flex-col justify-center">
              <div className="mb-8 lg:hidden">
                <AuraLogo className="w-28 h-auto text-primary" />
                <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Admin Access</p>
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

              <div className="mt-8 rounded-2xl border border-border bg-background/70 p-4 lg:hidden">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Acceso temporal</p>
                <p className="mt-2 text-sm text-foreground">Usuario: admin@gmail.com</p>
                <p className="mt-1 text-sm text-foreground">Contrasena: admin123</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
