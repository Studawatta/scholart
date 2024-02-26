import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: 'https://scholart.onrender.com/api/',
  withCredentials: true,
});
