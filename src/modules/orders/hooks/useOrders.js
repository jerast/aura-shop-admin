import { useMemo, useState } from 'react'

function useOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  function filterOrders(orders, getUserName) {
    const query = search.trim().toLowerCase()

    const filtered = orders.filter((order) => {
      const matchesQuery =
        !query ||
        order.id.toLowerCase().includes(query) ||
        (getUserName ? getUserName(order.user).toLowerCase().includes(query) : true)

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      let matchesDate = true
      if (dateFilter === "all") {
        matchesDate = true
      } else if (dateFilter === "7") {
        const limit = new Date()
        limit.setDate(limit.getDate() - 7)
        matchesDate = new Date(order.date) >= limit
      } else if (dateFilter === "30") {
        const limit = new Date()
        limit.setDate(limit.getDate() - 30)
        matchesDate = new Date(order.date) >= limit
      } else if (dateFilter === "month") {
        const now = new Date()
        matchesDate = order.date.startsWith(now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0'))
      } else if (dateFilter === "year") {
        const year = new Date().getFullYear()
        matchesDate = order.date.startsWith(String(year))
      }

      return matchesQuery && matchesStatus && matchesDate
    })

    return filtered
  }

  function computeStats(orders) {
    const statusColors = {
      pending: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-600', label: 'Pendientes' },
      ready: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-600', label: 'Listos' },
      delivered: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-600', label: 'Entregados' },
      canceled: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-600', label: 'Cancelados' },
    }

    const totals = {
      pending: orders.filter(o => o.status === 'pending').length,
      ready: orders.filter(o => o.status === 'ready').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      canceled: orders.filter(o => o.status === 'canceled').length,
    }

    return Object.entries(totals).map(([key, value]) => ({
      ...statusColors[key],
      value,
      status: key,
    }))
  }

  return {
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
  }
}

export default useOrders
