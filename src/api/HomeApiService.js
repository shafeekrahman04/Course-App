import apiClient from './ApiClient';

export const getDashboardData = (id = '') => apiClient.get(`/studentDashboard?id=${id}`);

export const getQuizDetails = (id = '') => apiClient.get(`/getQuizDetails?id=${id}`);

export const quizSave = (data) => apiClient.post('https://jsonplaceholder.typicode.com/posts', data);

export const getDocDetails = (id = '') => apiClient.get(`/getDocDetails?id=${id}`);