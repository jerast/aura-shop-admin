import { useEffect, useState } from 'react'
import { Download, Search, Users, UserPlus, UserCheck, X, MapPin, Mail, Phone, Calendar } from 'lucide-react'
import cn from '@shared/utils/className'
import { getUsers } from '@customers/services/users.services'
import { useUsersStore } from '@customers/store/useUsers.store'
import useCustomers from '@customers/hooks/useCustomers'

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function CustomerDetail({ customer, onClose }) {
  if (!customer) return null

  const initials = `${customer.name?.charAt(0) || ''}${customer.surname?.charAt(0) || ''}`

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-card border-l border-border shadow-xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-lg font-semibold text-foreground">Perfil del Cliente</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-primary text-2xl font-semibold mx-auto mb-4">
              {initials}
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {customer.name} {customer.surname}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                customer.status ? "bg-emerald-500" : "bg-muted-foreground"
              )} />
              <span className="text-sm text-muted-foreground">
                {customer.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="w-4 h-4 text-primary flex items-center justify-center text-xs font-bold">ID</span>
              <span className="text-sm text-foreground">{customer.dniType} {customer.dniNumber}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="w-4 h-4 text-primary flex items-center justify-center text-xs font-bold">G</span>
              <span className="text-sm text-foreground">
                {customer.gender === 'M' ? 'Masculino' : customer.gender === 'F' ? 'Femenino' : '-'}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{formatDate(customer.birthday)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CustomersPage() {
  const users = useUsersStore(state => state.users)
  const setUsers = useUsersStore(state => state.setUsers)

  const {
    search,
    selectedCustomer,
    setSearch,
    setSelectedCustomer,
    filterCustomers,
    computeStats,
  } = useCustomers()

  useEffect(() => {
    (async () => {
      const data = await getUsers()
      const customers = (data || []).filter(u => u.role === 'customer')
      setUsers(customers)
    })()
  }, [])

  const filteredCustomers = filterCustomers(users)
  const stats = computeStats(users)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu base de clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-secondary">
                {stat.label.includes("Total") && <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />}
                {stat.label.includes("mes") && <UserPlus className="w-5 h-5 text-primary" strokeWidth={1.5} />}
                {stat.label === "Activos" && <UserCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />}
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar clientes..."
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Teléfono</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Cédula</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Género</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Estado</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Cumpleaños</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const initials = `${customer.name?.charAt(0) || ''}${customer.surname?.charAt(0) || ''}`
                return (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary text-sm font-medium">
                          {initials}
                        </div>
                        <span className="font-medium text-foreground">{customer.name} {customer.surname}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{customer.phone}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{customer.dniType} {customer.dniNumber}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {customer.gender === 'M' ? 'Masculino' : customer.gender === 'F' ? 'Femenino' : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          customer.status ? "bg-[--status-delivered-text]" : "bg-muted-foreground"
                        )} />
                        <span className="text-sm text-muted-foreground">
                          {customer.status ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(customer.birthday)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No hay clientes que coincidan con la búsqueda.
          </div>
        )}
      </div>

      <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  )
}

export default CustomersPage
