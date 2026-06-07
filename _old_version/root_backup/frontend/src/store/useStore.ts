import { create } from 'zustand';
import { Book, User } from '../types';

interface AppState {
  user: (User & { avatar?: string; email?: string }) | null;
  favorites: number[];
  readingNow: { bookId: number; currentPage: number } | null;
  setUser: (user: User | null) => void;
  toggleFavorite: (bookId: number) => void;
  setReadingNow: (reading: { bookId: number; currentPage: number } | null) => void;
  updateUserProfile: (data: Partial<User & { avatar?: string; email?: string }>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: 1,
    fullname: 'Ali Valiyev',
    phone: '+998 90 123 45 67',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    email: 'ali@example.com'
  },
  favorites: [],
  readingNow: null,
  
  setUser: (user) => set({ user: user as any }),
  
  toggleFavorite: (bookId) => set((state) => ({
    favorites: state.favorites.includes(bookId)
      ? state.favorites.filter(id => id !== bookId)
      : [...state.favorites, bookId]
  })),
  
  setReadingNow: (reading) => set({ readingNow: reading }),
  
  updateUserProfile: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
}));
