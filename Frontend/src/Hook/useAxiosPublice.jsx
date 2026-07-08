import React from "react";
import axios from "axios";
const AxiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});
const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
