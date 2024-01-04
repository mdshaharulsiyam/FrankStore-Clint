import React, { useContext } from 'react'
import { FrankStoreData } from '../Context/FrankStoreContext'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {currentUser,loading}=useContext(FrankStoreData)
    if (loading) {
        return <span className="loading loading-ring loading-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
    }
    if(currentUser?.role ==='user'){
        return <Navigate to={'/dashboard/profile'}></Navigate>
    }
  return children
}


export default AdminRoute
