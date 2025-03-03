import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://rdfwebsite-production.up.railway.app"; // Change to your production URL when needed

const useRDFStore = create((set) => ({
  sliderinfo: [],
  programs: [],
  projects: [],
  activities: [],

  isLoading: false,

  fetchsliderinfo: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/slider`);
      set({ sliderinfo: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },

  fetchPrograms: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/programs`);
      set({ programs: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching programs:", error);
      set({ isLoading: false });
    }
  },

  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      set({ projects: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
  fetchActivites: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      set({ activities: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
}));

export default useRDFStore;
