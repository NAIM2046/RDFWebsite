import { create } from "zustand";
import axios from "axios";
import useAxiosPublic from "../Hook/useAxiosPublice";

const useRDFStore = create((set) => ({
  sliderinfo: [],
  programs: [],
  projects: [],

  isLoading: false,

  fetchsliderinfo: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        "http://localhost:3001/slider"
        // https://rdfwebsite-production.up.railway.app/
      );
      set({ sliderinfo: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
  fetchPrograms: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        "http://localhost:3001/programs"
        // https://rdfwebsite-production.up.railway.app/
      );
      set({ programs: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        "http://localhost:3001/projects"
        // https://rdfwebsite-production.up.railway.app/
      );
      set({ projects: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
}));

export default useRDFStore;
