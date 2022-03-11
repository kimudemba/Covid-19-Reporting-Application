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

export const getAllPatients = payload => api.get(`/patients`, payload);
export const getpatientById = id => api.get(`/patient/${id}`);
export const insertPatient = payload => api.post(`/patients`, payload);
export const updatePatientById = (id, payload) => api.put(`/patient/${id}`, payload);
export const deletePatientById = id => api.delete(`/patient/${id}`);
export const getAllExams = payload => api.get(`/exams`, payload);
export const getexamById = id => api.get(`/exam/${id}`);
export const insertExam = playload => api.post(`/exam/`,playload);
export const updateExamById = (id, payload) => api.put(`/exam/${id}`, payload);
export const deleteExamById = id => api.delete(`/exam/${id}`);


const apis = {
  getAllPatients,
  getpatientById,
  insertPatient,
  insertExam,
  updatePatientById,
  deletePatientById,
  getAllExams,
  getexamById,
  updateExamById,
  deleteExamById,
};

export default apis;
