import { create } from 'zustand';
import { ToDoItemInterface } from '../utils/interface';

interface SelectedItem {
    selectedItem: ToDoItemInterface ;
    setSelectedItem: (selectedItem: ToDoItemInterface) => void;
}
const useSelectedItem = create<SelectedItem>((set) => ({
    selectedItem: {} as ToDoItemInterface,
    setSelectedItem: (selectedItem : ToDoItemInterface) => set({ selectedItem: selectedItem }),
}));

export default useSelectedItem;