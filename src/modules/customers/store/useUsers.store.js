import { create } from 'zustand'

export const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,
  setUsers: (users) => set({ users }),
  toggleLoading: (isLoading) => set({ isLoading }),
}))
