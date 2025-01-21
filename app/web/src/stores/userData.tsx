import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Coordinates {
  lat: number;
  lon: number;
  displayName?: string;
}

interface LocationState {
  location: string;
  coordinates: Coordinates | null;
  keywords: string;
  changeLocation: (location: string, coords?: Coordinates) => void;
  changeKeywords: (keywords: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: "",
      coordinates: null,
      keywords: "",
      changeLocation: (newLocation: string, coords?: Coordinates) =>
        set(() => ({
          location: newLocation,
          coordinates: coords || null,
        })),
      changeKeywords: (newKeywords: string) =>
        set(() => ({ keywords: newKeywords })),
    }),
    {
      name: "location-storage",
    }
  )
);

interface ResumeState {
  cv: File | null;
  setUserResume: (cv: File | null) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  cv: null,
  setUserResume: (cv: File | null) => set(() => ({ cv })),
}));
