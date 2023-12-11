import axios from "axios";
const axiosrequest = axios.create({
    baseURL:'http://localhost:5000',
    // withCredentials : true
})
const useAxiosrequest = () => {
  return axiosrequest
}

export default useAxiosrequest
