import { create } from "zustand";

interface LocationState {
  location: string;
  changeLocation: (location: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: "",
  changeLocation: (newLocation: string) =>
    set((_) => ({ location: newLocation })),
}));
