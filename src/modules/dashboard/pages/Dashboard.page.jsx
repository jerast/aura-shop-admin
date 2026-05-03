import { KPICards } from "@dashboard/components/kpi-cards"
import { SalesChart, CategoryChart } from "@dashboard/components/charts"
import { RecentOrders } from "@dashboard/components/recent-orders" 
import { LowStockAlert } from "@dashboard/components/low-stock-alert"

// Variable para controlar la visibilidad de los bloques del dashboard
const SHOW_DASHBOARD_BLOCKS = true

function DashboardPage() {
  return (
    <>
      <div className="mb-8 pt-12 lg:pt-0">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bienvenida de nuevo, María</p>
      </div>

      {/* Dashboard blocks - ocultos pero NO eliminados */}
      {SHOW_DASHBOARD_BLOCKS && (
        <>
          {/* KPI Cards */}
          <section className="mb-8">
            <KPICards />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            <SalesChart />
            <CategoryChart />
          </section>

          {/* Bottom Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <RecentOrders />
            <LowStockAlert />
          </section>
        </>
      )}

      {/* Mensaje temporal cuando los bloques están ocultos */}
      {!SHOW_DASHBOARD_BLOCKS && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Dashboard en construcción</h2>
          <p className="text-muted-foreground max-w-md">
            Los widgets del dashboard estarán disponibles próximamente. Mientras tanto, puedes gestionar tus productos, pedidos y clientes desde el menú lateral.
          </p>
        </div>
      )}
    </>
  )
}

export default DashboardPage
