import https from 'https';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
  httpsAgent: https.Agent({
    rejectUnauthorized: false,
  }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllPatients = payload => api.get(`/patient`, payload);
export const getPatientById = id => api.get(`/patient/${id}`);
export const insertPatient = payload => api.post(`/patient`, payload);
export const updatePatientById = (id, payload) => api.put(`/patient/${id}`, payload);
export const deletePatientById = id => api.delete(`/patient/${id}`);

const apis = {
  getAllPatients,
  getPatientById,
  insertPatient,
  updatePatientById,
  deletePatientById,
};

export default apis;
