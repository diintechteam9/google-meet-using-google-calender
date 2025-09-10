import axios from 'axios';

export const api=axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true
});

export const getMe=()=>api.get('/auth/me');
export const logout=()=>api.post('/auth/logout');
export const createMeet=(payload)=>api.post('/api/meet', payload);
export const listMeets=()=>api.get('/api/meet');


