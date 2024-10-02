import { create } from 'zustand';

// Define the User interface
interface User {
    id: number;
    name: string;
    avatar: string;
}

// Define the Zustand store state interface
interface SelectedWidgetStore {
    user: User | null;
    setSelectedWidget: (user: User) => void;
    updateSelectedWidge: (updatedFields: Partial<User>) => void;
    clearSelectedWidge: () => void;
}

// Create the store using Zustand
const useSelectedWidge = create<SelectedWidgetStore>((set) => ({
    // The initial state for the single user
    user: null,

    // Function to set or update the user
    setSelectedWidget: (user: User) => set({ user }),

    // Function to update specific fields of the user
    updateSelectedWidge: (updatedFields: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedFields } : null,
    })),

    // Function to clear the user (e.g., logout)
    clearSelectedWidge: () => set({ user: null }),
}));

export default useSelectedWidge;
