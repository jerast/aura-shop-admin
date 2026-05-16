import { create } from 'zustand'

export const useOrdersStore = create((set) => ({
  orders: [],
  isLoading: false,
  setOrders: (orders) => set({ orders }),
  setLoading: (isLoading) => set({ isLoading }),
}))
