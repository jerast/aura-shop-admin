import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const salesData = [
  { month: "Ene", ventas: 4200 },
  { month: "Feb", ventas: 3800 },
  { month: "Mar", ventas: 5100 },
  { month: "Abr", ventas: 4600 },
  { month: "May", ventas: 5800 },
  { month: "Jun", ventas: 6200 },
  { month: "Jul", ventas: 5400 },
  { month: "Ago", ventas: 4900 },
  { month: "Sep", ventas: 5600 },
  { month: "Oct", ventas: 6800 },
  { month: "Nov", ventas: 7200 },
  { month: "Dic", ventas: 8100 },
]

const categoryData = [
  { category: "Vestidos", ventas: 4200 },
  { category: "Pantalones", ventas: 3100 },
  { category: "Blusas", ventas: 2800 },
  { category: "Accesorios", ventas: 2400 },
  { category: "Zapatos", ventas: 1900 },
]

export function SalesChart() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">Ventas en el Tiempo</h3>
        <p className="text-sm text-muted-foreground mt-1">Rendimiento mensual de ventas</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#78716C', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#78716C', fontSize: 12 }}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#1C1917', fontWeight: 600 }}
              formatter={(value) => [`€${value.toLocaleString()}`, 'Ventas']}
            />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#7C3AED"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function CategoryChart() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">Categorías Más Vendidas</h3>
        <p className="text-sm text-muted-foreground mt-1">Top 5 categorías por ingresos</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={categoryData} 
            layout="vertical" 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#78716C', fontSize: 12 }}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <YAxis 
              type="category" 
              dataKey="category" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#78716C', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#1C1917', fontWeight: 600 }}
              formatter={(value) => [`€${value.toLocaleString()}`, 'Ventas']}
            />
            <Bar dataKey="ventas" fill="url(#barGradient)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
