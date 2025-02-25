import { create } from "zustand";
import axios from "axios";

const useRDFStore = create((set) => ({
  sliderinfo: [],

  isLoading: false,

  fetchsliderinfo: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("http://localhost:3001/slider");
      set({ sliderinfo: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
}));

export default useRDFStore;
