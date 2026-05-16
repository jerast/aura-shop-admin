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
    return [
      { label: "Total Clientes", value: users.length },
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
