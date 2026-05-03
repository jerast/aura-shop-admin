import { Link } from "wouter"
import cn from "@shared/utils/className"

const orders = [
  { id: "#ORD-7842", customer: "Ana Martinez", amount: "EUR 245.00", status: "delivered" },
  { id: "#ORD-7841", customer: "Carlos Lopez", amount: "EUR 189.50", status: "active" },
  { id: "#ORD-7840", customer: "Maria Garcia", amount: "EUR 432.00", status: "pending" },
  { id: "#ORD-7839", customer: "Pedro Sanchez", amount: "EUR 98.00", status: "delivered" },
  { id: "#ORD-7838", customer: "Laura Fernandez", amount: "EUR 567.00", status: "cancelled" },
  { id: "#ORD-7837", customer: "Diego Ruiz", amount: "EUR 312.00", status: "active" },
]

const statusConfig = {
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  active: { label: "Activo", className: "bg-sky-100 text-sky-700" },
  delivered: { label: "Entregado", className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelado", className: "bg-rose-100 text-rose-700" },
}

export function RecentOrders() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">Pedidos Recientes</h3>
          <p className="mt-1 text-sm text-muted-foreground">Ultimas transacciones</p>
        </div>
        <Link href="/orders" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Ver todos
        </Link>
      </div>

      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID Pedido</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Cliente</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Importe</th>
              <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-muted/50">
                <td className="py-4 text-sm font-medium text-foreground">{order.id}</td>
                <td className="py-4 text-sm text-muted-foreground">{order.customer}</td>
                <td className="py-4 text-sm font-medium tabular-nums text-foreground">{order.amount}</td>
                <td className="py-4">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", statusConfig[order.status].className)}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
