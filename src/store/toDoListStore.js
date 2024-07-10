import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useToDoStore = create(
  persist(
    (set, get) => ({
      toDoList: [],
      isLoading: false,
      error: null,

      // Action to fetch to-do list for a user
      fetchToDoList: async (userId) => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`/api/todos/${userId}`);
          set({ toDoList: response.data.toDoList, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to add a new to-do item
      addToDo: async (userId, task, dueDate) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(`/api/todos`, { userId, task, dueDate });
          set({ toDoList: response.data.toDoList, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to update a to-do item
      updateToDo: async (userId, toDoId, task, isCompleted, dueDate) => {
        set({ isLoading: true });
        try {
          const response = await axios.put(`/api/todos/${userId}/${toDoId}`, {
            task,
            isCompleted,
            dueDate,
          });
          set({ toDoList: response.data.toDoList, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },

      // Action to delete a to-do item
      deleteToDo: async (userId, toDoId) => {
        set({ isLoading: true });
        try {
          const response = await axios.delete(`/api/todos/${userId}/${toDoId}`);
          set({ toDoList: response.data.toDoList, isLoading: false });
        } catch (error) {
          set({ error: error.response.data.message, isLoading: false });
        }
      },
    }),
    { name: 'todo-store' }
  )
);

export default useToDoStore;
