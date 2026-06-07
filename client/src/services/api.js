import axios from 'axios';
import { startNetworkRequest, stopNetworkRequest } from '../utils/apiLoading';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
    (config) => {
        startNetworkRequest();
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        stopNetworkRequest();
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        stopNetworkRequest();
        return response;
    },
    (error) => {
        stopNetworkRequest();
        return Promise.reject(error);
    }
);

export default api;
