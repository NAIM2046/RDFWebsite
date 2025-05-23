import React from "react";
import axios from "axios";
const AxiosPublic = axios.create({
  baseURL: "https://rdfwebsite-production.up.railway.app",
  // https://rdfwebsite-production.up.railway.app
});
const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
