import { Vendor } from "../types";
import { VENDORS } from "../data/vendors";
import { create } from "zustand";

interface VendorState {
  vendors: Vendor[];
  setVendor: (payload: Vendor[]) => void;
  toggleFavorite: (vendorId: string) => void;
}

const useStore = create<VendorState>((set) => ({
  vendors: VENDORS,

  setVendor: (payload) => set({ vendors: payload }),

  toggleFavorite: (vendorId) =>
    set((state) => ({
      vendors: state.vendors.map((vendor) =>
        vendor.id === vendorId
          ? { ...vendor, favorite: !vendor.favorite }
          : vendor
      ),
    })),
}));

export default useStore;
