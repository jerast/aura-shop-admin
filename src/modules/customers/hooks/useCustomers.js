import { useMemo, useState } from 'react'

function useCustomers() {
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  function filterCustomers(users) {
    const query = search.trim().toLowerCase()
    return users.filter((user) => {
      if (!query) return true
      return (
        user.name?.toLowerCase().includes(query) ||
        user.surname?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.dniNumber?.toString().includes(query)
      )
    })
  }

  function computeStats(users) {
    const total = users.length
    const now = new Date()
    const thisMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0')
    const newThisMonth = users.filter(u => u.createdAt?.startsWith(thisMonth)).length

    return [
      { label: "Total Clientes", value: total },
      { label: "Nuevos este mes", value: newThisMonth },
      { label: "Activos", value: users.filter(u => u.status).length },
    ]
  }

  return {
    search,
    selectedCustomer,
    setSearch,
    setSelectedCustomer,
    filterCustomers,
    computeStats,
  }
}

export default useCustomers
