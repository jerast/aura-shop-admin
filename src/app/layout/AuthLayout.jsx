function AuthLayout ({ children }) {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(109,40,217,0.15),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(248,248,251,1))]" />
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-accent blur-3xl" />
        <main className="relative mx-auto flex min-h-screen max-w-lg items-center justify-center px-5 py-10 lg:px-8">
          <div className="w-full overflow-hidden rounded-[28px] border border-border bg-card/90 shadow-[0_30px_100px_rgba(24,24,27,0.12)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export default AuthLayout
