import React from "react";
import axios from "axios";
const AxiosPublic = axios.create({
  //baseURL: "http://localhost:3001",
  baseURL: "https://api.rdfbd.org",
});
const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
