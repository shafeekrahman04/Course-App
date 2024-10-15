import apiClient from './ApiClient'

export const userAuthenticate  = (username,password) =>  apiClient.post('/Authenticate', { username: username,password: password})
