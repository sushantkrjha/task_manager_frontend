import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks/";

// Function to get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  if (!token) {
    console.error("No authentication token found!");
    return null;
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor to attach the token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();
    if (!headers) {
      console.error("Unauthorized: No token found.");
      throw new Error("Unauthorized request. Please log in.");
    }
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all tasks (GET)
export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    throw error;
  }
};

// Add a new task (POST)
export const addTask = async (taskData) => {
  try {
    console.log("Task Data before sending:", taskData);

    if (!taskData.title?.trim() || !taskData.description?.trim()) {
      throw new Error("Title and description cannot be empty.");
    }

    const response = await axiosInstance.post("/", taskData);
    console.log("Task added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing task (PUT)
export const updateTask = async (taskId, taskData) => {
  try {
    if (!taskId) throw new Error("Task ID is required for updating.");

    const response = await axiosInstance.put(`/${taskId}/`, taskData);
    console.log("Task updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a task (DELETE)
export const deleteTask = async (taskId) => {
  try {
    if (!taskId) throw new Error("Task ID is required for deletion.");

    const response = await axiosInstance.delete(`/${taskId}/`);
    console.log("Task deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error;
  }
};
