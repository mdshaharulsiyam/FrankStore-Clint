import React, { useContext, useEffect } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import { useState } from 'react'
import { UserStatistic } from './UserStatistic'
import { AdminStatistic } from './adminStatistic'

export const Statistic = () => {
    const { currentUser } = useContext(FrankStoreData)
    const axiosecure = useAxiosSecure()
    const [data,setdata]=useState({})
    useEffect(()=>{
        axiosecure.get(`/dashboard/${currentUser?.useremail}`)
        .then((data) => setdata(data.data))
    },[])
  return (
    <>
    {currentUser?.role==='user' && <UserStatistic data={data}/>}
    {currentUser?.role!=='user' && <AdminStatistic data={data}/>}
    </>
  )
}
