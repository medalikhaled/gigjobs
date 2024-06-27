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

//* ----

interface ResumeState {
  cv: File | null;
  setUserResume: (cv: File | null) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  cv: null,
  setUserResume: (cv: File | null) => set((_) => ({ cv: cv })),
}));
