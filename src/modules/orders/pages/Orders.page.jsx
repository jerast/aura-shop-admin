import { useEffect } from 'react'
import { Search, ChevronDown, Eye, X } from 'lucide-react'
import cn from '@shared/utils/className'
import { getOrders } from '@orders/services/orders.services'
import { useOrdersStore } from '@orders/store/useOrders.store'
import { useUsersStore } from '@customers/store/useUsers.store'
import { useShopStore } from '@shop/store/useShop.store'
import useOrders from '@orders/hooks/useOrders'
import Skeleton from '@shared/ui/Skeleton'

const statusConfig = {
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  ready: { label: "Listo", className: "bg-sky-100 text-sky-700" },
  delivered: { label: "Entregado", className: "bg-emerald-100 text-emerald-700" },
  canceled: { label: "Cancelado", className: "bg-rose-100 text-rose-700" },
}

const statusColors = {
  pending: "bg-amber-500 hover:bg-amber-600",
  ready: "bg-sky-500 hover:bg-sky-600",
  delivered: "bg-emerald-500 hover:bg-emerald-600",
  canceled: "bg-rose-500 hover:bg-rose-600",
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

function OrderDetail({ order, onClose, getUserName, getProductName, getProductImage, onUpdateStatus }) {
  if (!order) return null

  const totalItems = order.list?.reduce((acc, item) => acc + item.count, 0) || 0
  const userName = getUserName(order.user)

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[500px] flex-col border-l border-border bg-card shadow-xl">
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
            <h3 className="mt-2 text-lg font-semibold text-foreground">{userName}</h3>
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
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Estado actual</p>
            <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-4", statusConfig[order.status]?.className || "")}>
              {statusConfig[order.status]?.label || order.status}
            </span>
            
            <p className="text-xs text-muted-foreground mb-3">Cambiar estado:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(statusConfig).map(([status, config]) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => onUpdateStatus(order._id, status)}
                  disabled={order.status === status}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-medium text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                    statusColors[status]
                  )}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {order.list?.length > 0 && (
            <div className="rounded-2xl border border-border p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Productos ({totalItems})</p>
              <div className="mt-4 space-y-4">
                {order.list.map((item) => {
                  const productName = getProductName(item.product)
                  const productImage = getProductImage(item.product)
                  return (
                    <div key={item._id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                        {productImage ? (
                          <img 
                            src={`https://res.cloudinary.com/jerastcloud/image/upload/w_100/Aura-B/products/${productImage}`}
                            alt={productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextElementSibling.classList.remove('hidden')
                            }}
                          />
                        ) : null}
                        <span className={cn("text-xs text-muted-foreground font-medium", productImage ? "hidden" : "")}>
                          {productName?.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{productName}</p>
                        <p className="text-xs text-muted-foreground">Cantidad: {item.count}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-foreground">COP {item.prices?.wholesale?.toLocaleString()}</span>
                          {item.prices?.retail && item.prices.retail !== item.prices.wholesale && (
                            <span className="text-xs text-muted-foreground line-through">COP {item.prices.retail.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
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
  const isLoading = useOrdersStore(state => state.isLoading)
  const setLoading = useOrdersStore(state => state.setLoading)
  const users = useUsersStore(state => state.users)
  const products = useShopStore(state => state.products)

  function getUserName(userId) {
    const user = users.find(u => u.id === userId)
    return user ? `${user.name} ${user.surname}` : userId
  }

  function getProductName(productId) {
    const product = products.find(p => p.id === productId)
    return product?.name || productId
  }

  function getProductImage(productId) {
    const product = products.find(p => p.id === productId)
    return product?.image || null
  }

  function updateOrderStatus(orderId, newStatus) {
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ))
  }

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
      setLoading(true)
      const data = await getOrders()
      setOrders(data)
      setLoading(false)
    })()
  }, [])

  const filteredOrders = filterOrders(orders, getUserName)
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

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-3 sm:p-4 bg-card">
                <Skeleton className="h-7 w-12 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))
          ) : (
            stats.map((stat) => (
              <div key={stat.status} className={cn("rounded-xl border p-3 sm:p-4", stat.bg, stat.border)}>
                <p className={cn("text-xl sm:text-2xl font-semibold", stat.text)}>{stat.value}</p>
                <p className={cn("text-xs sm:text-sm", stat.text)}>{stat.label}</p>
              </div>
            ))
          )}
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
                <option value="ready">Listo</option>
                <option value="delivered">Entregado</option>
                <option value="canceled">Cancelado</option>
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
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-8" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-8 w-8 rounded-lg" /></td>
                    </tr>
                  ))
                ) : (
                  filteredOrders.map((order) => {
                    const itemCount = order.list?.reduce((acc, item) => acc + item.count, 0) || 0
                    return (
                      <tr key={order._id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">{getUserName(order.user)}</span>
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
                  })
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && filteredOrders.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No hay pedidos que coincidan con los filtros actuales.
            </div>
          )}
        </div>
      </div>

      <OrderDetail 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        getUserName={getUserName}
        getProductName={getProductName}
        getProductImage={getProductImage}
        onUpdateStatus={updateOrderStatus}
      />
    </>
  )
}

export default OrdersPage
