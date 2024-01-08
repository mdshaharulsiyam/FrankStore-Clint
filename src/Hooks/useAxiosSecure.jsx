import axios from 'axios'
const axiosecure = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://frank-store-server.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosecure
}

export default useAxiosSecure
