import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import useAuthStore from './authStore';

const useAnimalsStore = create(
  persist(
    (set, get) => ({
      animals: [],
      getAnimals: async () => {
        const { user } = useAuthStore.getState();
        const categories = user.categories;
        const animals = categories?.flatMap((category) =>
          category.animals.map((animal) => ({
            ...animal,
            categoryId: category._id,
            categoryName: category.name,
          }))
        );
        set({ animals });
      },
      filterAnimalsByCategory: (categoryId) => {
        const { user } = useAuthStore.getState();
        const categories = user.categories;
        const animals = categories?.flatMap((category) =>
          category.animals.map((animal) => ({
            ...animal,
            categoryId: category._id,
            categoryName: category.name,
          }))
        );
        set({ animals: animals.filter((animal) => animal.categoryId === categoryId) });
      },
    }),
    { name: 'animals-store' }
  )
);

export default useAnimalsStore;
