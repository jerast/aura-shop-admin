import { Store, Bell, CreditCard, Truck, Users, Shield, Globe } from "lucide-react"
import cn from "@shared/utils/className"

// Secciones visibles
const settingsSections = [
  {
    title: "Tienda",
    description: "Configura los detalles de tu tienda",
    icon: Store,
    items: [
      { label: "Nombre de la tienda", value: "LUXE Fashion Store" },
      { label: "Email de contacto", value: "contacto@luxe.es" },
      { label: "Moneda", value: "EUR (€)" },
    ]
  },
]

// Secciones ocultas - NO eliminar, se usarán más adelante
const hiddenSections = [
  {
    title: "Notificaciones",
    description: "Gestiona las alertas y notificaciones",
    icon: Bell,
    toggles: [
      { label: "Nuevos pedidos", enabled: true },
      { label: "Stock bajo", enabled: true },
      { label: "Nuevos clientes", enabled: false },
      { label: "Reseñas", enabled: true },
    ]
  },
  {
    title: "Pagos",
    description: "Configura los métodos de pago",
    icon: CreditCard,
    items: [
      { label: "Stripe", value: "Conectado", badge: "active" },
      { label: "PayPal", value: "No configurado", badge: "inactive" },
      { label: "Transferencia", value: "Activo", badge: "active" },
    ]
  },
  {
    title: "Envíos",
    description: "Configura las opciones de envío",
    icon: Truck,
    items: [
      { label: "Envío estándar", value: "€4.99" },
      { label: "Envío express", value: "€9.99" },
      { label: "Envío gratis desde", value: "€50.00" },
    ]
  },
]

function SettingsPage () {
  return (
    <>
      <div className="pt-12 lg:pt-0 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold text-foreground">Configuración</h1>
          <p className="text-muted-foreground mt-1">Gestiona las preferencias de tu tienda</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-secondary">
                    <section.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">{section.title}</h2>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {section.items?.map((item) => (
                  <div key={item.label} className="px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          item.badge === "active"
                            ? "bg-[--status-delivered] text-[--status-delivered-text]"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {item.badge === "active" ? "Activo" : "Inactivo"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {section.toggles?.map((toggle) => (
                  <div key={toggle.label} className="px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-foreground">{toggle.label}</span>
                    <button
                      className={cn(
                        "relative h-6 w-11 overflow-hidden rounded-full transition-colors",
                        toggle.enabled ? "bg-primary" : "bg-border"
                      )}
                    >
                      <span className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-card shadow-sm transition-transform",
                        toggle.enabled ? "translate-x-1" : "translate-x-6"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Cards - Ocultas por ahora, NO eliminar */}
          {true && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-card rounded-2xl p-6 border border-border text-left hover:border-primary/30 transition-colors group">
                <div className="p-2.5 rounded-xl bg-secondary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Equipo</h3>
                <p className="text-sm text-muted-foreground">Gestiona usuarios y permisos</p>
              </button>

              <button className="bg-card rounded-2xl p-6 border border-border text-left hover:border-primary/30 transition-colors group">
                <div className="p-2.5 rounded-xl bg-secondary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Seguridad</h3>
                <p className="text-sm text-muted-foreground">Autenticación y privacidad</p>
              </button>

              <button className="bg-card rounded-2xl p-6 border border-border text-left hover:border-primary/30 transition-colors group">
                <div className="p-2.5 rounded-xl bg-secondary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <Globe className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Dominio</h3>
                <p className="text-sm text-muted-foreground">Configura tu dominio personalizado</p>
              </button>

              <button className="bg-card rounded-2xl p-6 border border-border text-left hover:border-primary/30 transition-colors group">
                <div className="p-2.5 rounded-xl bg-secondary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <CreditCard className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Facturación</h3>
                <p className="text-sm text-muted-foreground">Planes y facturas</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SettingsPage
