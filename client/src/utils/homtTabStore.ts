import { create } from "zustand";

interface HomeTabStore {
  selectedTab: string;
  selectTab: (tab: string) => void;
}

const useHomeTabStore = create<HomeTabStore>((set: any) => ({
  selectedTab: "for-you",
  selectTab: (tab: string) => set({ selectedTab: tab }),
}));

export default useHomeTabStore;
