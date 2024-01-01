import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import { FrankStoreData } from '../Context/FrankStoreContext'
import { useContext } from "react";
const axiosecure = useAxiosSecure()
const useGetUsers = (filter,pagenumber) => {
    const {currentUser}=useContext(FrankStoreData)
    const { isPending, data: users = [], refetch } = useQuery({
        enabled: !!currentUser?.useremail,
          queryKey : ['users', currentUser?.useremail,filter,pagenumber],
        queryFn: async () => {
          const res = await axiosecure.get(`/users?useremail=${currentUser?.useremail}&filter=${filter}&pagenumber=${pagenumber}`)
          return res.data;
        }
      })
      return [isPending, users, refetch]
}

export default useGetUsers
