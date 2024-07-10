import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGeneralStore = create(
  persist(
    (set, get) => ({
      generalIsLoading: false,
      generalError: null,

      setGeneralIsLoading: (isLoading) => set({ generalIsLoading: isLoading }),
      setGeneralError: (error) => set({ generalError: error }),

      resetGeneralStore: () => set({ generalIsLoading: false, generalError: null }),
    }),
    { name: `general-store` }
  )
);

export default useGeneralStore;
