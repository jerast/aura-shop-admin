import { create } from 'zustand'

export const useOrdersStore = create((set) => ({
  orders: [],
  isLoading: false,
  setOrders: (orders) => set({ orders }),
  toggleLoading: (isLoading) => set({ isLoading }),
}))
