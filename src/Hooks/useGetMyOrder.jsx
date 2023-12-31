import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
const axiosecure = useAxiosSecure()
const useGetMyOrder = (useremail) => {
    const { isPending, data: OrderData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['order', useremail],
        queryFn: async () => {
          const res = await axiosecure.get(`/order?useremail=${useremail}`)
          return res.data;
        }
      })
      return [isPending, OrderData, refetch]
}

export default useGetMyOrder
