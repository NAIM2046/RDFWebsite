import { create } from "zustand";
import axios from "axios";

//const BASE_URL = "http://localhost:3001"; // Change to your production URL when needed
const BASE_URL = "https://api.rdfbd.org"; // Change to your production URL when needed

const useRDFStore = create((set) => ({
  sliderinfo: [],
  programs: [],
  projects: [],
  activities: [],
  teams: [],
  newss: [],
  photo: [],
  video: [],
  events: [],
  partners: [],
  reports: [],

  isLoading: false,

  fetchReport: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/reports`);
      set({ reports: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },
  fetchPartner: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/partner`);
      set({ partners: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },
  fetchEvent: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/event`);
      set({ events: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },

  fetchPhoto: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/photos`);
      set({ photo: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },
  fetchVideo: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/video`);
      set({ video: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },

  fetchNews: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/news`);
      set({ newss: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching slider info:", error);
      set({ isLoading: false });
    }
  },

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
  fetchTeams: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/teams`);
      set({ teams: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ isLoading: false });
    }
  },
}));

export default useRDFStore;
