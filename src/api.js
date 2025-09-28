import axios from "axios";

let API_URL = "http://localhost:5000/api";
if (process.env.REACT_APP_API_URL) {
  API_URL = process.env.REACT_APP_API_URL;
}

const api = axios.create({
  baseURL: API_URL,
});

export default api;
