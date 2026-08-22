import axios from 'axios';

//Laravel backend address - yahi se sara data aayega
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// agar user login h, to har request ke sath uska token bhi bhej denge
// isse Laravel ko pata chalega "ye request wahi user bhej raha h jo login hua tha"
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;