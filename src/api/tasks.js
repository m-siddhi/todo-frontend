import axios from "axios";

const API_URL = "https://todo-backend-1-1jez.onrender.com/api/tasks";

export const getTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, updatedTask) =>
  axios.put(`${API_URL}/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const updateStatus = (id, status) =>
  axios.patch(`${API_URL}/${id}/status`, { status });
export const searchTasks = (query) => axios.get(`${API_URL}/search?q=${query}`);
