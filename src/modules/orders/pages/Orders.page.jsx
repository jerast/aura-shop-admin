import { useEffect } from 'react'
import { Search, ChevronDown, Eye, MoreHorizontal, X } from 'lucide-react'
import cn from '@shared/utils/className'
import { getOrders } from '@orders/services/orders.services'
import { useOrdersStore } from '@orders/store/useOrders.store'
import useOrders from '@orders/hooks/useOrders'

const statusConfig = {
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Listo", className: "bg-sky-100 text-sky-700" },
  delivered: { label: "Entregado", className: "bg-emerald-100 text-emerald-700" },
  canceled: { label: "Cancelado", className: "bg-rose-100 text-rose-700" },
}

const dateFilterOptions = [
  { value: "7", label: "Últimos 7 días" },
  { value: "30", label: "Últimos 30 días" },
  { value: "month", label: "Este mes" },
  { value: "year", label: "Este año" },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function OrderDetail({ order, onClose }) {
  if (!order) return null

  const totalItems = order.list?.reduce((acc, item) => acc + item.count, 0) || 0

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">{order.id}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Detalle y gestión del pedido</p>
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
            <p className="mt-2 text-sm font-medium text-foreground">{order.user}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fecha</p>
              <p className="mt-2 font-medium text-foreground">{formatDate(order.date)}</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Importe</p>
              <p className="mt-2 font-medium text-foreground">COP {order.total_price?.toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estado actual</p>
                <span className={cn("mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusConfig[order.status]?.className || "")}>
                  {statusConfig[order.status]?.label || order.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{totalItems} artículos</p>
            </div>
          </div>

          {order.list?.length > 0 && (
            <div className="rounded-2xl border border-border p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Productos</p>
              <div className="mt-3 space-y-3">
                {order.list.map((item) => (
                  <div key={item._id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.product}</p>
                      <p className="text-xs text-muted-foreground">x{item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">COP {item.prices?.wholesale?.toLocaleString()}</p>
                      {item.prices?.retail && item.prices.retail !== item.prices.wholesale && (
                        <p className="text-xs text-muted-foreground line-through">COP {item.prices.retail.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function OrdersPage() {
  const orders = useOrdersStore(state => state.orders)
  const setOrders = useOrdersStore(state => state.setOrders)

  const {
    search,
    statusFilter,
    dateFilter,
    selectedOrder,
    setSearch,
    setStatusFilter,
    setDateFilter,
    setSelectedOrder,
    filterOrders,
    computeStats,
  } = useOrders()

  useEffect(() => {
    (async () => {
      const data = await getOrders()
      setOrders(data)
    })()
  }, [])

  const filteredOrders = filterOrders(orders)
  const stats = computeStats(orders)

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
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Artículos</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Importe</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const itemCount = order.list?.reduce((acc, item) => acc + item.count, 0) || 0
                  return (
                    <tr key={order._id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
                      <td className="px-6 py-4">
                        <span className="font-medium text-foreground">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.user}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(order.date)}</td>
                      <td className="px-6 py-4 text-sm tabular-nums text-foreground">{itemCount}</td>
                      <td className="px-6 py-4 text-sm font-medium tabular-nums text-foreground">COP {order.total_price?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", statusConfig[order.status]?.className || "")}>
                          {statusConfig[order.status]?.label || order.status}
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
                        </div>
                      </td>
                    </tr>
                  )
                })}
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

      <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  )
}

export default OrdersPage
