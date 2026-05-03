import { AlertTriangle } from "lucide-react"
import cn from "@shared/utils/className"

const lowStockProducts = [
  { name: "Vestido Floral Midi", stock: 3, maxStock: 50, image: "VF" },
  { name: "Blazer Oversized Negro", stock: 5, maxStock: 40, image: "BO" },
  { name: "Pantalón Wide Leg", stock: 8, maxStock: 60, image: "PW" },
  { name: "Top Satinado Beige", stock: 4, maxStock: 35, image: "TS" },
]

export function LowStockAlert() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[--status-processing]">
            <AlertTriangle className="w-4 h-4 text-[--status-processing-text]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">Alerta de Stock Bajo</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{lowStockProducts.length} productos necesitan reposición</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {lowStockProducts.map((product) => {
          const percentage = (product.stock / product.maxStock) * 100
          const isVeryLow = percentage < 10
          
          return (
            <div key={product.name} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                {product.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all",
                        isVeryLow ? "bg-destructive" : "bg-[--status-processing-text]"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-xs font-medium tabular-nums",
                    isVeryLow ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {product.stock}/{product.maxStock}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <button className="w-full mt-6 py-2.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-secondary transition-colors">
        Ver inventario completo
      </button>
    </div>
  )
}
