import { create } from "zustand";

export const usePageDataStore = create<{
  data: string;
  title: string;
  setData: (data: string) => void;
  setTitle: (title: string) => void;
}>((set) => ({
  data: "",
  title: "",

  setData: (data: string) => set({ data }),
  setTitle: (title: string) => set({ title }),
}));
