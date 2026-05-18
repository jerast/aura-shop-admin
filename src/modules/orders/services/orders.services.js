import { toast } from "sonner"
import api from "@app/config/api.config"

export async function getOrders () {
  try {
    const { data } = await api.get(`/orders`)

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

export async function updateOrderStatus (id, status) {
  const endpoints = {
    pending: `/orders/pending/${id}`,
    ready: `/orders/confirm/${id}`,
    delivered: `/orders/deliver/${id}`,
    canceled: `/orders/cancel/${id}`,
  }

  try {
    const { data } = await api.put(endpoints[status])

    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return null
    }

    return data.order
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al actualizar el estado, intenta de nuevo.')
    return null
  }
}
