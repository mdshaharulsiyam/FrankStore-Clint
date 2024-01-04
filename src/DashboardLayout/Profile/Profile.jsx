import React, { useContext } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'

const Profile = () => {
    const { currentUser } = useContext(FrankStoreData)
    return (
        <>
            {
                <p className='text-center py-5 pt-10 uppercase text-3xl'>profile</p >
            }
            {
                <div className='container mx-auto p-4 pl-20 pt-20 flex flex-wrap justify-start gap-4'>
                    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <img src={currentUser?.profileImage} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl">{currentUser?.username}</h2>
                                <h2>role : {currentUser?.role}</h2>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className=" flex justify-start items-center gap-1"> {currentUser?.useremail}</span>
                                {
                                    currentUser?.address && <span className=" flex justify-start items-center gap-1">address : {currentUser?.address}</span>
                                }


                            </div>
                        </div>
                    </div>

                </div>
            }

        </>
    )
}

export default Profile
