import { useMemo, useState } from 'react'
import { Search, ChevronDown, Eye, MoreHorizontal, X } from 'lucide-react'
import cn from '@shared/utils/className'

const initialOrders = [
  { id: "#ORD-7842", customer: "Ana Martinez", email: "ana@email.com", date: "15 Mar 2024", items: 3, amount: "EUR 245.00", status: "delivered" },
  { id: "#ORD-7841", customer: "Carlos Lopez", email: "carlos@email.com", date: "14 Mar 2024", items: 2, amount: "EUR 189.50", status: "active" },
  { id: "#ORD-7840", customer: "Maria Garcia", email: "maria@email.com", date: "14 Mar 2024", items: 5, amount: "EUR 432.00", status: "pending" },
  { id: "#ORD-7839", customer: "Pedro Sanchez", email: "pedro@email.com", date: "13 Mar 2024", items: 1, amount: "EUR 98.00", status: "delivered" },
  { id: "#ORD-7838", customer: "Laura Fernandez", email: "laura@email.com", date: "13 Mar 2024", items: 4, amount: "EUR 567.00", status: "cancelled" },
  { id: "#ORD-7837", customer: "Diego Ruiz", email: "diego@email.com", date: "12 Mar 2024", items: 2, amount: "EUR 312.00", status: "active" },
  { id: "#ORD-7836", customer: "Carmen Vega", email: "carmen@email.com", date: "12 Mar 2024", items: 3, amount: "EUR 198.00", status: "delivered" },
  { id: "#ORD-7835", customer: "Javier Moreno", email: "javier@email.com", date: "11 Mar 2024", items: 1, amount: "EUR 89.99", status: "pending" },
]

const statusConfig = {
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  active: { label: "Activo", className: "bg-sky-100 text-sky-700" },
  delivered: { label: "Entregado", className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelado", className: "bg-rose-100 text-rose-700" },
}

const dateFilterOptions = [
  { value: "7", label: "Ultimos 7 dias" },
  { value: "30", label: "Ultimos 30 dias" },
  { value: "month", label: "Este mes" },
  { value: "year", label: "Este ano" },
]

function OrderDetail({ order, onClose, onUpdateStatus }) {
  if (!order) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">{order.id}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Detalle y gestion del pedido</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-muted"
            aria-label="Cerrar detalle"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="rounded-2xl border border-border bg-muted/30 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cliente</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{order.customer}</h3>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fecha</p>
              <p className="mt-2 font-medium text-foreground">{order.date}</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Importe</p>
              <p className="mt-2 font-medium text-foreground">{order.amount}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estado actual</p>
                <span className={cn("mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusConfig[order.status].className)}>
                  {statusConfig[order.status].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{order.items} articulos</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {Object.entries(statusConfig).map(([status, config]) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onUpdateStatus(order.id, status)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                    order.status === status
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-primary/30 hover:bg-muted"
                  )}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("7")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    return orders.filter((order) => {
      const matchesQuery =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query)

      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesDate = dateFilter === "7" || dateFilter === "30" || dateFilter === "month" || dateFilter === "year"

      return matchesQuery && matchesStatus && matchesDate
    })
  }, [dateFilter, orders, search, statusFilter])

  const stats = useMemo(() => {
    const totals = orders.reduce(
      (acc, order) => {
        acc.total += 1
        acc[order.status] += 1
        return acc
      },
      { total: 0, pending: 0, active: 0, delivered: 0, cancelled: 0 }
    )

    return [
      { label: "Total pedidos", value: totals.total },
      { label: "Pendientes", value: totals.pending },
      { label: "Activos", value: totals.active },
      { label: "Entregados", value: totals.delivered },
    ]
  }, [orders])

  function updateOrderStatus(orderId, nextStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    )
    setSelectedOrder((currentOrder) =>
      currentOrder && currentOrder.id === orderId ? { ...currentOrder, status: nextStatus } : currentOrder
    )
  }

  function cycleStatus(order) {
    const nextStatusByCurrent = {
      pending: "active",
      active: "delivered",
      delivered: "cancelled",
      cancelled: "pending",
    }

    updateOrderStatus(order.id, nextStatusByCurrent[order.status])
  }

  return (
    <>
      <div className="pt-12 lg:pt-0">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">Pedidos</h1>
            <p className="mt-1 text-muted-foreground">Gestiona todos los pedidos de tu tienda</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por ID o cliente..."
              className="w-full rounded-lg border border-input bg-card py-2.5 pl-11 pr-4 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="appearance-none rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="active">Activo</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="relative">
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="appearance-none rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {dateFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID Pedido</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Articulos</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Importe</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 text-sm tabular-nums text-foreground">{order.items}</td>
                    <td className="px-6 py-4 text-sm font-medium tabular-nums text-foreground">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", statusConfig[order.status].className)}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg p-2 transition-colors hover:bg-muted"
                          aria-label={`Ver ${order.id}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          type="button"
                          onClick={() => cycleStatus(order)}
                          className="rounded-lg p-2 transition-colors hover:bg-muted"
                          aria-label={`Cambiar estado de ${order.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No hay pedidos que coincidan con los filtros actuales.
            </div>
          )}
        </div>
      </div>

      <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={updateOrderStatus} />
    </>
  )
}

export default OrdersPage
