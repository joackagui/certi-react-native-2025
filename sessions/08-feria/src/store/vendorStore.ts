import { create } from 'zustand'
import { Vendor } from '../types';

type VendorStore = {
  vendors: Vendor[];
  setVendor: (payload: Vendor[]) => void;
  likeVendor: (id: string) => void;
  dislikeVendor: (id: string) => void;
}

export const useVendorStore = create<VendorStore>((set) => ({
  vendors: [],
  setVendor: (payload) => set(() => ({ vendors : payload })),
  likeVendor: (id) => set((state) => ({
    vendors: state.vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, liked: true } : vendor
    ),
  })),
  dislikeVendor: (id) => set((state) => ({
    vendors: state.vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, liked: false } : vendor
    ),
  })),
}))
