
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const loginUser = async (login, password) => {
  const response = await api.post('/auth/login', { login, password });
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await api.get('/auth/me'); 
  return response.data;
};

export default api;
