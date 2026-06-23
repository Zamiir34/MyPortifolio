import axios from 'axios';

const PRODUCTION_API = 'https://myportifolio-1-xdlo.onrender.com/api';
const PRODUCTION_SERVER = 'https://myportifolio-1-xdlo.onrender.com';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? PRODUCTION_API : '/api');

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const base =
      import.meta.env.VITE_API_URL?.replace('/api', '') ||
      (import.meta.env.PROD ? PRODUCTION_SERVER : '');
    return `${base}${path}`;
  }
  return path;
};

export default api;
