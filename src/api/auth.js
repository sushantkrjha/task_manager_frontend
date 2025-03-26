import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login/`, { username, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register/`, { username, email, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};