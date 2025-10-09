import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = async () => {
  return (await api.get('post/')).data;
};

export const postPosts = async (values) => {
  return (await api.post('post/', values)).data;
};

export const updatePosts = async (id, values) => {
  return (await api.put(`post/${id}`, values)).data;
};

export const deletePosts = async (id) => {
  return (await api.delete(`post/${id}`)).data;
};
