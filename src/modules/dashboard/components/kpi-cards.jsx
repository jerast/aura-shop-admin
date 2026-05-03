import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Target } from "lucide-react"
import cn from "@shared/utils/className"

function KPICard({ title, value, change, changeLabel, icon: Icon, details, progress }) {
  const isPositive = change >= 0

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-secondary">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-[--status-delivered] text-[--status-delivered-text]" : "bg-[--status-cancelled] text-[--status-cancelled-text]"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}{change}%
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-semibold text-foreground tracking-tight">{value}</p>
      
      {details && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">{detail.label}:</span>
                <span className="font-medium text-foreground">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {progress !== undefined && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Progreso</span>
            <span className="text-xs font-medium text-foreground">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">{changeLabel}</p>
    </div>
  )
}

export function KPICards() {
  const kpis = [
    {
      title: "Ingresos Totales",
      value: "€124,580",
      change: 12.5,
      changeLabel: "vs. mes anterior",
      icon: DollarSign,
    },
    {
      title: "Pedidos Activos",
      value: "284",
      change: 8.2,
      changeLabel: "vs. mes anterior",
      icon: ShoppingBag,
      details: [
        { label: "Procesando", value: "48" },
        { label: "Enviados", value: "156" },
        { label: "Entregados", value: "80" },
      ],
    },
    {
      title: "Total Clientes",
      value: "3,842",
      change: 15.3,
      changeLabel: "vs. mes anterior",
      icon: Users,
      details: [
        { label: "Nuevos este mes", value: "128" },
      ],
    },
    {
      title: "Tasa de Conversión",
      value: "3.24%",
      change: -2.1,
      changeLabel: "vs. mes anterior",
      icon: Target,
      progress: 65,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
