import { MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { FrankStoreData } from "../../../Context/FrankStoreContext";
const CartItemModal = ({ setCartItemShow, cartData,refetch }) => {
    const {currentUser}=useContext(FrankStoreData)
    // console.log(setCartItemShow, cartData)
    const axiosequre = useAxiosSecure()
    const removefromCart = (_id) => {
        // Cart
        axiosequre.delete(`/Cart?useremail=${currentUser?.useremail}&id=${_id}`)
        .then((res)=>{
            refetch()
            console.log(res.data)
        })
    }
    return (
        <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-900 text-gray-100 absolute z-10 right-0 top-[73px] max-h-[450px] overflow-y-auto rounded-lg">
            <h2 className="text-xl font-semibold">my cart</h2>
            <ul className="flex flex-col divide-y dark:divide-gray-700">
                {
                    cartData?.map(item => <li className="flex flex-col py-6 sm:flex-row sm:justify-between">

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
                                    <Link onClick={()=>setCartItemShow(false)} to={`/payment/${item?.cartData[0]?._id}`}>
                                        <button type="button" className="flex items-center px-2 py-1 space-x-1 hover:text-green-600 active:scale-95">
                                            <MdOutlineLocalShipping className="text-xl" />
                                            <span className="uppercase">Order now</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>)
                }
            </ul>
            <div className="space-y-1 text-right">
                <p className=" dark:text-gray-400 text-xl">Happy shopping</p>
            </div>
            <div className="flex justify-end space-x-4">
                <button onClick={() => setCartItemShow(false)} type="button" className="px-6 py-2 border rounded-md dark:border-violet-400 hover:scale-105 hover:text-blue-600">Back
                    <span className="sr-only sm:not-sr-only"> to shop</span>
                </button>
                <Link to={'/products'} onClick={() => setCartItemShow(false)} type="button" className="px-6 py-2 border rounded-md dark:border-violet-400 hover:scale-105 hover:text-blue-600">
                    <span className="sr-only sm:not-sr-only">All products</span>
                </Link>
                <button type="button" className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400 hover:scale-105 hover:text-blue-600">
                    <span className="sr-only sm:not-sr-only">my Orders</span>
                </button>
            </div>
        </div>
    )
}

export default CartItemModal
