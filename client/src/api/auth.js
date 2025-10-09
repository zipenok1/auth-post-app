import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const register = async (values) => {
  return (await api.post('user/register', values)).data;
};

export const login = async (values) => {
  return (await api.post('user/login', values)).data;
};
