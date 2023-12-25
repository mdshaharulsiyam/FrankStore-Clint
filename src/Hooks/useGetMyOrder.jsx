import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"

const useGetMyOrder = (useremail) => {
    const { isPending, data: OrderData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['cart', useremail],
        queryFn: async () => {
          const res = await axiosecure.get(`/Cart?useremail=${useremail}`)
          return res.data;
        }
      })
      return [isPending, OrderData, refetch]
}

export default useGetMyOrder
