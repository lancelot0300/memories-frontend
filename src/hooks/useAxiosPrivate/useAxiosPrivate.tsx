import  { useEffect } from 'react'
import useRefresh from '../useRefresh/useRefresh';
import axios from 'axios';

function useAxiosPrivate() {

    const refresh = useRefresh();

    const axiosPrivate = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
    });
 
    useEffect(() => {

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest.sent = true;
                    await refresh();
                    return axiosPrivate(originalRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
        
    }, [refresh, axiosPrivate])

    return axiosPrivate;
}

export default useAxiosPrivate