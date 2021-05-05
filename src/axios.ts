import axios from 'axios';

export const movieAxios = axios.create(
    {baseURL : 'http://api.tvmaze.com'}
)