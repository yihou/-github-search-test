import axios from 'axios';

export const ajax = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Accept: 'application/json',
    }
});
