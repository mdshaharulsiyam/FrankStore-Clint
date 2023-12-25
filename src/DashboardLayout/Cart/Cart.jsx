import React, { useContext } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import useGetCartData from '../../Hooks/useGetCartData'
import { Link } from 'react-router-dom'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { TbListDetails } from "react-icons/tb";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
const Cart = () => {
    const { currentUser } = useContext(FrankStoreData)
    const [isPending, cartData, refetch] = useGetCartData(currentUser?.useremail)
const axiosequre = useAxiosSecure()
    const removefromCart = (_id) => {
        // Cart
        axiosequre.delete(`/Cart?useremail=${currentUser?.useremail}&id=${_id}`)
        .then((res)=>{
            console.log(res.data)
        })
    }
    return (
        <>
            <h3 className='text-center text-3xl font-semibold pt-6'>cart items</h3>
            <p>total item {cartData.length}</p>
            <div className='md:grid lg:grid-cols-2 gap-2 '>
            {
                    cartData?.map(item => <div className="flex flex-col py-6 shadow-2xl p-2 sm:flex-row sm:justify-between">

                        <div className="flex w-full space-x-2 sm:space-x-4">
                            <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item?.cartData[0]?.productImage} alt="Polaroid camera" />
                            <div className="flex flex-col justify-between w-full pb-4">
                                <div className="flex justify-between w-full pb-2 space-x-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leadi sm:pr-8">{item?.cartData[0]?.productName}</h3>
                                        <p className="text-sm dark:text-gray-400">Brand :: {item?.cartData[0]?.brand}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">${item?.cartData[0]?.price}</p>
                                    </div>
                                </div>
                                <div className="flex text-sm divide-x">
                                    <button onClick={()=>removefromCart(item?.cartData[0]?._id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1  hover:text-red-600 active:scale-95">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                            <rect width="32" height="200" x="168" y="216"></rect>
                                            <rect width="32" height="200" x="240" y="216"></rect>
                                            <rect width="32" height="200" x="312" y="216"></rect>
                                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                        </svg>
                                        <span>Remove</span>
                                    </button>
                                    <Link  to={`/payment/${item?.cartData[0]?._id}`}>
                                        <button type="button" className="flex items-center px-2 py-1 space-x-1 hover:text-green-600 active:scale-95">
                                            <MdOutlineLocalShipping className="text-xl" />
                                            <span className="uppercase">Order</span>
                                        </button>
                                    </Link>
                                    <Link  to={`/productDeails/${item?.cartData[0]?._id}`}>
                                        <button type="button" className="flex items-center px-2 py-1 space-x-1 hover:text-green-600 active:scale-95">
                                            <TbListDetails className="text-xl" />
                                            <span className="uppercase">details</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default Cart