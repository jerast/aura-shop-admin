import { useState } from "react"
import cn from "@shared/utils/className";
import { Edit2, Trash2 } from "lucide-react"

function getStatus(product) {
  if (!product.status) return "out"
  if (product.stock <= 0) return "out"
  if (product.stock < 10) return "low"
  return "active"
}

const statusConfig = {
  active: { label: "En stock", className: "bg-emerald-100 text-emerald-700" },
  low: { label: "Stock bajo", className: "bg-amber-100 text-amber-700" },
  out: { label: "Agotado", className: "bg-rose-100 text-rose-700" },
}

function ProductCard ({ product, viewMode, handleEdit, handleDelete }) {
  const [imgError, setImgError] = useState(false)
  const price = product.prices?.wholesale ?? 0
  const originalPrice = product.prices?.retail ?? null
  const status = getStatus(product)
  const showImage = product.image && !imgError

  return (
    <div
      key={product.id}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        viewMode === "list" && "flex flex-col sm:flex-row"
      )}
    >
      <div className={cn("relative bg-muted", viewMode === "grid" ? "aspect-square" : "sm:w-56 sm:shrink-0")}>
        {showImage ? (
          <img
            src={`https://res.cloudinary.com/jerastcloud/image/upload/w_500/Aura-B/products/${product.image}`}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : null}
        <div className={cn("absolute inset-0 flex items-center justify-center text-4xl font-serif text-primary/20", showImage ? "hidden" : "")}>
          {product.name?.charAt(0)}
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
          <span className="text-lg font-semibold text-foreground">COP {price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">COP {originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                status === "active" && "bg-emerald-600",
                status === "low" && "bg-amber-600",
                status === "out" && "bg-rose-600"
              )}
            />
            <span className="text-xs text-muted-foreground">{statusConfig[status].label}</span>
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">{product.stock} uds</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
