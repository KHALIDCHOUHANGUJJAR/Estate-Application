import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3133/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("unauthorized!");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
