import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
const axiosecure = useAxiosSecure()

const useGetAllOrder = (useremail) => {
    const { isPending, data: allOrderData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['allorder', useremail],
        queryFn: async () => {
          const res = await axiosecure.get(`/allorder?useremail=${useremail}`)
          return res.data;
        }
      })
      return [isPending, allOrderData, refetch]
}

export default useGetAllOrder
