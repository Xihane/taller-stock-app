import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // o donde tengas el backend corriendo
});

export default api;
