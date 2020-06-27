import axios from 'axios';
import {getToken, removeToken} from './auth';
import _ from 'lodash';

export const ajax = axios.create({
    baseURL: `http://localhost:${process.env.SERVER_PORT}`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

// auto append JWT token in header
ajax.interceptors.request.use(async config => {
    const token = getToken();
    config.headers = {
        ...config.headers,
        ...(token ? {Authorization: `Bearer ${token}`} : {})
    };
    return config;
});

const onAuthErrorRedirect = async error => {
    const response = _.get(error, 'response');

    if (response && response.status === 401) {
        // log user out
        removeToken();

        window.location.href = '/login';
    }
};

ajax.interceptors.response.use(
    f => f,
    error => {
        // noinspection JSIgnoredPromiseFromCall
        onAuthErrorRedirect(error);

        return Promise.reject(error);
    }
);
