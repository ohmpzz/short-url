import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/short-url`;

export function FetchAll() {
  return axios.get(`${BASE_URL}`, { withCredentials: true });
}

export function FetchByCode(payload: { code: string}) {
  return axios.get(`${BASE_URL}/${payload.code}`);
}

export function Create(payload: { long_url: string }) {
  return axios.post(`${BASE_URL}`, payload, { withCredentials: true });
}

export function Update(payload: { long_url: string; code: string }) {
  return axios.patch(`${BASE_URL}/${payload.code}`, payload, {
    withCredentials: true,
  });
}

export function Remove(payload: { code: string }) {
  return axios.delete(`${BASE_URL}/${payload.code}`, {
    withCredentials: true,
  });
}
