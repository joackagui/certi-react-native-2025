import { create } from 'zustand'

const useStore = create((set) => ({
  vendors: [],
  setVendor: (payload) => set(() => ({ vendors : payload })),
}))
