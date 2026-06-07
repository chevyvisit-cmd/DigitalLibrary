import { create } from 'zustand';
import axios from 'axios';

interface ReadingState {
  currentBookId: string | null;
  currentChapterId: string | null;
  progress: number;
  isSyncing: boolean;
  
  setCurrentBook: (bookId: string) => void;
  updateProgress: (bookId: string, percentage: number, chapterId?: string) => Promise<void>;
  syncProgress: (bookId: string, percentage: number, chapterId?: string) => Promise<void>;
}

export const useReadingStore = create<ReadingState>((set, get) => ({
  currentBookId: null,
  currentChapterId: null,
  progress: 0,
  isSyncing: false,

  setCurrentBook: (bookId) => set({ currentBookId: bookId }),

  updateProgress: async (bookId, percentage, chapterId) => {
    set({ progress: percentage, currentChapterId: chapterId || get().currentChapterId });
  },

  syncProgress: async (bookId, percentage, lastChapterId) => {
    set({ isSyncing: true });
    try {
      await axios.post('/api/progress', {
        bookId,
        percentage,
        lastChapterId
      });
    } catch (error) {
      console.error('Failed to sync progress:', error);
    } finally {
      set({ isSyncing: false });
    }
  }
}));
