import { useState } from 'react'
import { Download, Search, Users, UserPlus, Crown, X, MapPin, Mail, Phone, Calendar, ShoppingBag, DollarSign } from 'lucide-react'
import cn from '@shared/utils/className'

const customers = [
  { id: 1, name: "Ana Martínez", email: "ana@email.com", phone: "+34 612 345 678", orders: 12, totalSpent: 1245.00, status: "active", lastPurchase: "2024-03-15", avatar: "AM", location: "Madrid, España" },
  { id: 2, name: "Carlos López", email: "carlos@email.com", phone: "+34 623 456 789", orders: 8, totalSpent: 890.50, status: "active", lastPurchase: "2024-03-12", avatar: "CL", location: "Barcelona, España" },
  { id: 3, name: "María García", email: "maria@email.com", phone: "+34 634 567 890", orders: 24, totalSpent: 3420.00, status: "active", lastPurchase: "2024-03-18", avatar: "MG", location: "Valencia, España" },
  { id: 4, name: "Pedro Sánchez", email: "pedro@email.com", phone: "+34 645 678 901", orders: 3, totalSpent: 245.00, status: "inactive", lastPurchase: "2024-01-20", avatar: "PS", location: "Sevilla, España" },
  { id: 5, name: "Laura Fernández", email: "laura@email.com", phone: "+34 656 789 012", orders: 18, totalSpent: 2180.00, status: "active", lastPurchase: "2024-03-16", avatar: "LF", location: "Bilbao, España" },
  { id: 6, name: "Diego Ruiz", email: "diego@email.com", phone: "+34 667 890 123", orders: 5, totalSpent: 567.00, status: "active", lastPurchase: "2024-03-10", avatar: "DR", location: "Málaga, España" },
]

function CustomerDetail({ customer, onClose }) {
  if (!customer) return null

  const orderHistory = [
    { id: "#ORD-7842", date: "15 Mar 2024", amount: "€245.00", items: 3 },
    { id: "#ORD-7801", date: "28 Feb 2024", amount: "€189.50", items: 2 },
    { id: "#ORD-7756", date: "14 Feb 2024", amount: "€312.00", items: 4 },
  ]

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
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-primary text-2xl font-semibold mx-auto mb-4">
              {customer.avatar}
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">{customer.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                customer.status === "active" ? "bg-[--status-delivered-text]" : "bg-muted-foreground"
              )} />
              <span className="text-sm text-muted-foreground">
                {customer.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {/* Contact Info */}
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
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{customer.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-4 rounded-xl bg-secondary">
              <ShoppingBag className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-semibold text-foreground">{customer.orders}</p>
              <p className="text-xs text-muted-foreground">Pedidos</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary">
              <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-semibold text-foreground">€{customer.totalSpent.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-semibold text-foreground">2023</p>
              <p className="text-xs text-muted-foreground">Cliente desde</p>
            </div>
          </div>

          {/* Order History */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Historial de Pedidos</h4>
            <div className="space-y-2">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date} • {order.items} artículos</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Notas Internas</h4>
            <textarea 
              placeholder="Añade notas sobre este cliente..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </>
  )
}

function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const stats = [
    { label: "Total Clientes", value: "3,842", icon: Users },
    { label: "Nuevos este mes", value: "128", icon: UserPlus },
    { label: "Clientes VIP", value: "89", icon: Crown },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu base de clientes</p>
        </div>
        {/* Botón Exportar oculto - no eliminar */}
        {false && (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-lg font-medium text-sm hover:bg-muted transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-secondary">
                <stat.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text"
          placeholder="Buscar clientes..."
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Cliente</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Teléfono</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Pedidos</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Total Gastado</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Estado</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Última Compra</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr 
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary text-sm font-medium">
                        {customer.avatar}
                      </div>
                      <span className="font-medium text-foreground">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground tabular-nums">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground tabular-nums">€{customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        customer.status === "active" ? "bg-[--status-delivered-text]" : "bg-muted-foreground"
                      )} />
                      <span className="text-sm text-muted-foreground">
                        {customer.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{customer.lastPurchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  )
}

export default CustomersPage