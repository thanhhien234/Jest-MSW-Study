import { create } from 'zustand';

interface ModalIsOpen {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useModalIsOpen = create<ModalIsOpen>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen: isOpen }),
}));

export default useModalIsOpen;