import axios from "axios";

const BASE_URL = "https://todo-backend-1-1jez.onrender.com/api/tasks";

export const fetchTasks = () => axios.get(BASE_URL);
export const addTask = (task) => axios.post(BASE_URL, task);
export const editTask = (id, taskData) =>
  axios.put(`${BASE_URL}/${id}`, taskData);
export const removeTask = (id) => axios.delete(`${BASE_URL}/${id}`);
export const toggleStatus = (id, status) =>
  axios.patch(`${BASE_URL}/${id}/status`, { status });
export const searchTasks = (query) =>
  axios.get(`${BASE_URL}/search?q=${query}`);
