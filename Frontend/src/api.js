import axios from 'axios';
import Cookies from 'js-cookie'; // or your preferred cookie library
import { useSelector } from 'react-redux';

// Create Axios instance
const api = axios.create({
    baseURL: 'your_api_base_url', // Replace with your API base URL
});
const { authUser } = useSelector(store => store.user)
// Set up interceptor
api.interceptors.request.use(config => {
    // const token = Cookies.get('token');
    const token = authUser.token
    console.log(token)
    // Replace 'jwtToken' with your cookie name
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;