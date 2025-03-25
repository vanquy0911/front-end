import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Đặt URL backend
});

export default api;
