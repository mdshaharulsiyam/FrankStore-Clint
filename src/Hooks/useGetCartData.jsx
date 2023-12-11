import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
const axiosecure =useAxiosSecure()
const useGetCartData = (useremail) => {
const {isPending,data: cartData = [],refetch} =useQuery({
    queryKey : ['cart',useremail],
    queryFn : async()=>{
        const res = await axiosecure.get(`/Cart?useremail=${useremail}`)
        return res.data;
    }
})
  return [isPending,cartData,refetch]
}

export default useGetCartData
