import apiClient from './ApiClient';

export const getDashboardData = (id = '') => apiClient.get(`/studentDashboard?id=${id}`);

export const getQuizDetails = (id = '') => apiClient.get(`/getQuizDetails?id=${id}`);

export const quizSave = (data) => apiClient.post('/quizAttendedStatus', data);

export const videoWatchedStatus = (userId,videoId) => {
    const payload ={
        UserId : userId,
        VideoId : videoId,
    }
    apiClient.post('/videoWatchedStatus',payload);
}
    




 
