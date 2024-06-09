import { create } from "zustand";

interface UpdateModalStoreProps {
  isModalOpen: boolean;
  tweetId: string;
  closeModal: () => void;
  openModal: (id: string) => void;
}

const useUpdateModalStore = create<UpdateModalStoreProps>((set: any) => ({
  isModalOpen: false,
  tweetId: "",
  openModal: (id: string) => set({ isModalOpen: true, tweetId: id }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useUpdateModalStore;
