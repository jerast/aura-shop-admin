import { useMemo, useState } from 'react'

function useOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("7")
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
      if (dateFilter === "7") {
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
    const totals = orders.reduce(
      (acc, order) => {
        acc.total += 1
        acc[order.status] = (acc[order.status] || 0) + 1
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
