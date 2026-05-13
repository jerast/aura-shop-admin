import { toast } from "sonner"
import api from "@app/config/api.config"

export async function getOrders () {
  try {
    const { data } = await api.get(`/api/orders`)

    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return []
    }

    return data.orders
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al obtener los pedidos, recarga e inténtalo de nuevo.')
    return []
  }
}
