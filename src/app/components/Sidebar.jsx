import { LayoutDashboard, Grid3X3, ShoppingBag, Users, Tag, SlidersHorizontal, Menu, X, LogOut, ChevronDown, } from 'lucide-react'
import { Link, useLocation} from 'wouter'
import { useState, useRef } from 'react'
import { useAuthStore } from '@auth/store/useAuth.store'
import useIsMobile from '../hooks/useMobile'
import cn from '../../shared/utils/className'
import AuraLogo from './AuraLogo'

const menuItems = [
  // { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Productos", href: "/products", icon: Grid3X3 },
  { name: "Pedidos", href: "/orders", icon: ShoppingBag },
  { name: "Clientes", href: "/customers", icon: Users },
  { name: "Descuentos", href: "/discounts", icon: Tag },
  // { name: "Configuración", href: "/settings", icon: SlidersHorizontal },
]

function Sidebar() {
  const isMobile = useIsMobile()
  const [location, _] = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          isMobile && !mobileOpen && "-translate-x-full",
          "fixed top-0 left-0 z-50 h-screen w-60 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-out lg:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-1 rounded-md hover:bg-muted"
          aria-label="Cerrar menú"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Logo */}
        <div className="px-6 py-8">
          <AuraLogo className="h-auto w-28 text-primary" />
          <span className="mt-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-secondary text-secondary-foreground border-l-2 border-primary ml-0"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive && "text-primary")} strokeWidth={1.5} />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border relative" ref={userMenuRef}>
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user.username.match(/\b\w/g).join("").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-foreground truncate">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-muted-foreground transition-transform",
              userMenuOpen && "rotate-180"
            )} />
          </button>

          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-card rounded-lg border border-border shadow-lg overflow-hidden">
              <button 
                onClick={() => {
                  setUserMenuOpen(false)
                  logout()
                  localStorage.removeItem('aura-admin-user')
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar