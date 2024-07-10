import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      isLoading: false,
      error: null,

      // Action to fetch categories for a user
      fetchCategories: async (userId) => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`/api/categories/${userId}`);
          set({ categories: response.data.categories, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to add a new category
      addCategory: async (userId, name) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`/api/categories`, { userId, name });
          set({ categories: response.data.categories, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to add a new animal to a category
      addAnimal: async (userId, categoryId, name, category, age, healthStatus, collarId) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`/api/categories/animals`, {
            userId,
            categoryId,
            name,
            category,
            age,
            healthStatus,
            collarId,
          });
          set({ categories: response.data.categories, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to fetch animals in a category
      fetchAnimals: async (userId, categoryId) => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`/api/categories/${userId}/${categoryId}`);
          const categoryItem = get().categories.find((cat) => cat._id === categoryId);
          if (categoryItem) {
            categoryItem.animals = response.data.animals;
          }
          set({ isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to update an animal in a category
      updateAnimal: async (userId, categoryId, animalId, name, category, age, healthStatus, collarId) => {
        set({ isLoading: true });
        try {
          const response = await axios.put(`/api/categories/${userId}/${categoryId}/${animalId}`, {
            name,
            category,
            age,
            healthStatus,
            collarId,
          });
          set({ categories: response.data.categories, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to delete an animal from a category
      deleteAnimal: async (userId, categoryId, animalId) => {
        set({ isLoading: true });
        try {
          const response = await axios.delete(`/api/categories/${userId}/${categoryId}/${animalId}`);
          set({ categories: response.data.categories, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },
    }),
    { name: "category-store" }
  )
);

export default useCategoryStore;
