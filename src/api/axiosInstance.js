import axios from 'axios'

// Use environment variable or fallback to production backend
const baseURL = import.meta.env.VITE_API_URL || 'https://sudharnayak.onrender.com/api'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 60000, // 60 seconds timeout for slow server wake-up
})

console.log('API Base URL:', baseURL) // Debug log

axiosInstance.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            const { token } = JSON.parse(userInfo)
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
