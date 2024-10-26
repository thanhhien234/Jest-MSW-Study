import { create } from 'zustand';
import { ToDoItemInterface } from '../utils/interface';

interface ItemsStore {
    items: ToDoItemInterface[]; 
    setItems: (items: ToDoItemInterface[]) => void; 
}


const useItemsStore = create<ItemsStore>((set) => ({
    items: [],
    setItems: (items) => set({ items: items }),
}));


export default useItemsStore;