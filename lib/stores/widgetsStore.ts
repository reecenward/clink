import { create } from 'zustand';

// Define the User interface
interface User {
    id: number;
    name: string;
    avatar: string;
}

// Create the store using Zustand
const useSelectedWidge = create((set) => ({
    // The initial state for the single user
    user: null as User | null,

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
