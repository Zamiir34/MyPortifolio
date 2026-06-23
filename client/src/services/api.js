import axios from 'axios';

const RENDER_API = 'https://myportifolio-1-xdlo.onrender.com/api';
const RENDER_ORIGIN = 'https://myportifolio-1-xdlo.onrender.com';

export const getApiBaseUrl = () => {
  if (import.meta.env.DEV) return '/api';

  if (typeof window !== 'undefined') {
    if (window.location.hostname.includes('onrender.com')) return '/api';
    return RENDER_API;
  }

  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl?.startsWith('http')) return envUrl;
  return RENDER_API;
};

export const getServerOrigin = () => {
  const base = getApiBaseUrl();
  if (base.startsWith('http')) return base.replace('/api', '');
  if (typeof window !== 'undefined') return window.location.origin;
  return RENDER_ORIGIN;
};

const api = axios.create({
  timeout: 90000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let wakeUpPromise = null;

export const wakeUpServer = async () => {
  if (!wakeUpPromise) {
    wakeUpPromise = fetchWithRetry(() => api.get('/health'), 4, 4000).finally(() => {
      wakeUpPromise = null;
    });
  }
  return wakeUpPromise;
};

export const fetchWithRetry = async (request, retries = 3, delay = 3000) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await request();
    } catch (error) {
      if (attempt === retries) throw error;
      await sleep(delay * (attempt + 1));
    }
  }
};

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    return `${getServerOrigin()}${path}`;
  }
  return path;
};

export default api;
