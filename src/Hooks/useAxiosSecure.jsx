import axios from 'axios'
const axiosecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosecure
}

export default useAxiosSecure
