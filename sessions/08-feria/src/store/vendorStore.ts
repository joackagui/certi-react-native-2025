import { create } from 'zustand';
import { Vendor } from '../types';
import { VENDORS } from '../data/vendors';

type VendorStore = {
  vendors: Vendor[];
  setVendor: (payload: Vendor[]) => void;
  likeVendor: (id: string) => void;
  dislikeVendor: (id: string) => void;
};

export const useVendorStore = create<VendorStore>((set) => ({
  vendors: VENDORS.map((vendor) => ({ ...vendor, liked: vendor.liked ?? false })),
  setVendor: (payload) => set(() => ({ vendors: payload.map((item) => ({ ...item })) })),
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
}));
