import axios from "axios";

let API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export default api;
