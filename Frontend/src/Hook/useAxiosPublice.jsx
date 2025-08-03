import React from "react";
import axios from "axios";
const AxiosPublic = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://rdfwebsite-production.up.railway.app",
});
const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
