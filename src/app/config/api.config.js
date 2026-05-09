import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_AURAB_APIURL || 'http://192.168.0.1:1000/',
});

api.interceptors.request.use( config => {
   config.headers = {
      ...config.headers,
      'x-token': localStorage.getItem('aura-admin-user')
   };

   return config;
});

export default api;
