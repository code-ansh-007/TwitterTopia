import { create } from "zustand";

interface CreateModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const useCreateModalStore = create<CreateModalProps>((set: any) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useCreateModalStore;
