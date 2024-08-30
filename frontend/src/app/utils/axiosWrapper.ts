import axios from 'axios';
import { BASE_URL } from './constants';

const defaultHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

export function getAxios() {
  const token = sessionStorage.getItem('token');
  if (token == null) {
    return axios.create({
      baseURL: `${BASE_URL}`,
      headers: {
        ...defaultHeaders,
      },
    });
  }
  return axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
}
