import { useState } from 'react'
import { Plus, Percent, DollarSign, X, Calendar, ChevronDown, Sparkles, Tag } from 'lucide-react'
import { toast } from 'sonner'
import cn from '@shared/utils/className'

const initialDiscounts = [
  { id: 1, code: "SUMMER25", type: "percentage", value: 25, used: 48, limit: 100, validUntil: "2024-06-30", status: "active" },
  { id: 2, code: "WELCOME10", type: "percentage", value: 10, used: 234, limit: 500, validUntil: "2024-12-31", status: "active" },
  { id: 3, code: "PROD20", type: "product", value: 20, used: 45, limit: 150, validUntil: "2024-07-15", status: "active" },
  { id: 4, code: "VIP50", type: "fixed", value: 50, used: 12, limit: 50, validUntil: "2024-05-15", status: "paused" },
]

const initialExpiredDiscounts = [
  { id: 5, code: "SPRING20", type: "percentage", value: 20, used: 150, limit: 150, validUntil: "2024-03-01", status: "expired" },
  { id: 6, code: "FLASH15", type: "percentage", value: 15, used: 300, limit: 300, validUntil: "2024-02-14", status: "expired" },
]

const typeConfig = {
  percentage: { icon: Percent, label: "Porcentaje", color: "bg-primary text-primary-foreground" },
  fixed: { icon: DollarSign, label: "Valor", color: "bg-accent text-accent-foreground" },
  product: { icon: Tag, label: "Producto", color: "bg-[--status-processing] text-[--status-processing-text]" },
}

function CreateDiscountModal({ open, onClose, onCreate }) {
  const [discountType, setDiscountType] = useState("percentage")
  const [form, setForm] = useState({
    code: "",
    value: "",
    limit: "",
    perCustomer: "1",
    validFrom: "",
    validUntil: "",
    applyTo: "Todos los productos",
  })

  if (!open) return null

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function generateCode() {
    const randomCode = `PROMO${Math.floor(1000 + Math.random() * 9000)}`
    updateField("code", randomCode)
    toast.success("Codigo generado")
  }

  function handleSubmit(event) {
    event.preventDefault()

    onCreate({
      id: Date.now(),
      code: form.code || `PROMO${Math.floor(1000 + Math.random() * 9000)}`,
      type: discountType,
      value: Number(form.value || 0),
      used: 0,
      limit: Number(form.limit || 100),
      validUntil: form.validUntil || "2026-12-31",
      status: "active",
    })

    setForm({
      code: "",
      value: "",
      limit: "",
      perCustomer: "1",
      validFrom: "",
      validUntil: "",
      applyTo: "Todos los productos",
    })
    setDiscountType("percentage")
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-border bg-card px-6 py-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">Crear Descuento</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-muted">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Codigo del Descuento</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.code}
                onChange={(event) => updateField("code", event.target.value.toUpperCase())}
                placeholder="Ej: VERANO25"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-3 uppercase text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={generateCode}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Sparkles className="h-4 w-4" />
                Generar
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Tipo de Descuento</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(typeConfig).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDiscountType(key)}
                  className={cn(
                    "rounded-xl border-2 p-4 text-center transition-all",
                    discountType === key ? "border-primary bg-secondary" : "border-border hover:border-primary/30"
                  )}
                >
                  <config.icon className={cn("mx-auto mb-2 h-5 w-5", discountType === key ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", discountType === key ? "text-primary" : "text-foreground")}>
                    {config.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Valor</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                {discountType === "percentage" ? "%" : "EUR"}
              </span>
              <input
                type="number"
                value={form.value}
                onChange={(event) => updateField("value", event.target.value)}
                placeholder="25"
                className="w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Limite Total</label>
              <input
                type="number"
                value={form.limit}
                onChange={(event) => updateField("limit", event.target.value)}
                placeholder="100"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Por Cliente</label>
              <input
                type="number"
                value={form.perCustomer}
                onChange={(event) => updateField("perCustomer", event.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Valido Desde</label>
              <input
                type="date"
                value={form.validFrom}
                onChange={(event) => updateField("validFrom", event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Valido Hasta</label>
              <input
                type="date"
                value={form.validUntil}
                onChange={(event) => updateField("validUntil", event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Aplicar a</label>
            <div className="relative">
              <select
                value={form.applyTo}
                onChange={(event) => updateField("applyTo", event.target.value)}
                className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>Todos los productos</option>
                <option>Categorias especificas</option>
                <option>Productos especificos</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="sticky bottom-0 rounded-b-2xl border-t border-border bg-card pt-4">
            <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Crear Descuento
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

function DiscountsPage () {
  const [discounts, setDiscounts] = useState(initialDiscounts)
  const [expiredDiscounts] = useState(initialExpiredDiscounts)
  const [modalOpen, setModalOpen] = useState(false)
  const [showExpired, setShowExpired] = useState(false)

  function toggleDiscountStatus(discountId) {
    setDiscounts((currentDiscounts) =>
      currentDiscounts.map((discount) =>
        discount.id === discountId
          ? { ...discount, status: discount.status === "active" ? "paused" : "active" }
          : discount
      )
    )
  }

  function handleCreateDiscount(discount) {
    setDiscounts((current) => [discount, ...current])
    setModalOpen(false)
    toast.success(`Descuento ${discount.code} creado`)
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Descuentos y Promociones</h1>
          <p className="mt-1 text-muted-foreground">Gestiona tus codigos de descuento</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" />
          Crear Descuento
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {discounts.map((discount) => {
          const config = typeConfig[discount.type]
          const usagePercentage = Math.min((discount.used / discount.limit) * 100, 100)

          return (
            <div key={discount.id} className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", config.color)}>
                  <config.icon className="h-3 w-3" />
                  {config.label}
                </span>
                <button
                  type="button"
                  onClick={() => toggleDiscountStatus(discount.id)}
                  className={cn(
                    "relative h-5 w-10 overflow-hidden rounded-full transition-colors",
                    discount.status === "active" ? "bg-primary" : "bg-border"
                  )}
                  aria-label={`Cambiar estado de ${discount.code}`}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform",
                      discount.status === "active" ? "-translate-x-4" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              <h3 className="mb-1 font-mono text-lg font-bold tracking-wide text-foreground">{discount.code}</h3>
              <p className="mb-1 text-2xl font-semibold text-primary">
                {discount.type === "percentage" ? `${discount.value}% OFF` : `EUR ${discount.value} OFF`}
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                {discount.status === "active" ? "Activo y aplicando beneficios" : "Pausado temporalmente"}
              </p>

              <div className="space-y-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Uso</span>
                    <span className="text-xs font-medium tabular-nums text-foreground">
                      {discount.used} / {discount.limit}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${usagePercentage}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Valido hasta {discount.validUntil}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setShowExpired(!showExpired)}
          className="flex w-full items-center justify-between bg-muted/30 px-6 py-4 transition-colors hover:bg-muted/50"
        >
          <span className="text-sm font-medium text-foreground">Descuentos Expirados ({expiredDiscounts.length})</span>
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showExpired && "rotate-180")} />
        </button>

        {showExpired && (
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {expiredDiscounts.map((discount) => {
              const config = typeConfig[discount.type]

              return (
                <div key={discount.id} className="rounded-2xl border border-border bg-card p-5 opacity-60">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <config.icon className="h-3 w-3" />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground">Expirado</span>
                  </div>

                  <h3 className="mb-1 font-mono text-lg font-bold tracking-wide text-muted-foreground">{discount.code}</h3>
                  <p className="mb-4 text-xl font-semibold text-muted-foreground">{discount.value}% OFF</p>

                  <div className="text-xs text-muted-foreground">Usos: {discount.used} / {discount.limit}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <CreateDiscountModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateDiscount} />
    </div>
  )
}

export default DiscountsPage
