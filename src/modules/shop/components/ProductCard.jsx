import cn from "@shared/utils/className";
import { Edit2, Copy, Trash2 } from "lucide-react"

const statusConfig = {
  active: { label: "En stock", className: "bg-[--status-delivered] text-[--status-delivered-text]" },
  low: { label: "Stock bajo", className: "bg-[--status-processing] text-[--status-processing-text]" },
  out: { label: "Agotado", className: "bg-[--status-cancelled] text-[--status-cancelled-text]" },
}

function ProductCard ({ product, viewMode, handleEdit, handleDelete }) {
  return (
    <div
      key={product.id}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        viewMode === "list" && "flex flex-col sm:flex-row"
      )}
    >
      <div className={cn("relative bg-muted", viewMode === "grid" ? "aspect-square" : "sm:w-56 sm:shrink-0")}>
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-primary/20">
          {product.name.charAt(0)}
        </div>
        {product.discount && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            -{product.discount}%
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 opacity-0 transition-colors group-hover:bg-foreground/5 group-hover:opacity-100">
          <button type="button" onClick={() => handleEdit(product)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-muted">
            <Edit2 className="h-4 w-4 text-foreground" />
          </button>
          <button type="button" onClick={() => handleDuplicate(product)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-muted">
            <Copy className="h-4 w-4 text-foreground" />
          </button>
          <button type="button" onClick={() => handleDelete(product.id)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-destructive hover:text-primary-foreground">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <span className="mb-2 inline-block rounded-full border border-primary/30 px-2 py-0.5 text-xs font-medium text-primary">
          {product.category}
        </span>
        <h3 className="font-medium text-foreground">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">EUR {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">EUR {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                product.status === "active" && "bg-[--status-delivered-text]",
                product.status === "low" && "bg-[--status-processing-text]",
                product.status === "out" && "bg-[--status-cancelled-text]"
              )}
            />
            <span className="text-xs text-muted-foreground">{statusConfig[product.status].label}</span>
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">{product.stock} uds</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
