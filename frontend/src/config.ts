// API Configuration
export const API_BASE_URL = 'https://backend-nof4pi5pm-ayushsrivastava55s-projects.vercel.app';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
};

// Chat endpoints
export const CHAT_ENDPOINTS = {
  SEND_MESSAGE: `${API_BASE_URL}/api/chat`,
  GET_HISTORY: `${API_BASE_URL}/api/chat/history`,
};

// Resource endpoints
export const RESOURCE_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/api/resources`,
  GET_BY_CATEGORY: `${API_BASE_URL}/api/resources/category`,
};

export default {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  CHAT_ENDPOINTS,
  RESOURCE_ENDPOINTS,
};
