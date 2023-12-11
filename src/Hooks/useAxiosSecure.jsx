import axios from 'axios'
import React from 'react'
const axiosecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosecure
}

export default useAxiosSecure
