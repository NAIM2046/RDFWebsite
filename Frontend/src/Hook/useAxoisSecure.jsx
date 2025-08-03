import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3001",
  //baseURL: "https://rdfwebsite-production.up.railway.app",
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("adminToken"); // Get token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
