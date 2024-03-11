import React, { useContext } from 'react'
import { FrankStoreData } from '../Context/FrankStoreContext'
import { Navigate, useLocation } from 'react-router-dom'

const UserRoute = ({children}) => {
    const {currentUser,loading}=useContext(FrankStoreData)
    const location = useLocation()
    console.log(location)
    if (loading) {
        return <span className="loading loading-ring loading-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
    }
    if(!currentUser?.useremail){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
  return children
}

export default UserRoute
