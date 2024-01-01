import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import useAxiosrequest from './useAxiosrequest'
const axiosrequest = useAxiosrequest()
const useGetallProducts = (categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage) => {
    //categoryFilter=${categoryFilter}&sortBy=${sortBy}&sortValue=${sortValue}&seacrhValue=${seacrhValue}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}
    const { isPending, data: allproducts = [], refetch } = useQuery({
        queryKey: ['allproducts', categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage],
        queryFn: async () => {
            const res = await axiosrequest.get(`/products?categoryFilter=${categoryFilter}&sortBy=${sortBy}&sortValue=${sortValue}&seacrhValue=${seacrhValue}&pageNumber=${pageNumber}&itemPerPage=${itemPerPage}`)
            return res.data;
        }
    })
    return [isPending, allproducts, refetch]

}

export default useGetallProducts
