import Axios from 'axios';

const axios = Axios.create()

axios.interceptors.request.use(config => {
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`
    }
    return config
})

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    });

export default axios;