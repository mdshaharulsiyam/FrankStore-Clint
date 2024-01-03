
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import { useLoaderData, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FrankStoreData } from "../../Context/FrankStoreContext";
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_API);
const Payment = () => {
    const product = useLoaderData()
    const { currentUser } = useContext(FrankStoreData)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [addingaddress, setaddingaddress] = useState(false)
    const { brand, category, date, description, price, productImage, productName, quantity, rating, review, totalSold, _id } = product.data
    const [adressstate, setadressstate] = useState('')
    const axiossecure = useAxiosSecure()
    const [show,setshow]=useState(false)
    const onSubmit = async (data) => {
        setaddingaddress(true)
        axiossecure.patch(`/address?useremail=${currentUser?.useremail}`, { address: data.address })
            .then((res) => {
                if (res.data.acknowledged) {
                    setaddingaddress(false)
                    setadressstate({ address: data.address })
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "adress addes succesfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    setaddingaddress(false)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: 'unable to add address'
                    });
                }
            })
    }
    //              currentUser?.address && 
    return (
        <>
            <div className="sm:flex flex-wrap gap-2 items-center justify-start max-w-2xl container mx-auto py-6">
                <img className="w-20 h-20 rounded" src={productImage} alt="" />
                <span>
                    <p className="text-lg font-semibold">{productName}</p>
                    <p>brand : {brand}</p>
                </span>
            </div>
            {
                ((!currentUser?.address && !adressstate) || show) ? <div className=" max-w-2xl container mx-auto">
                    {
                        show && <button onClick={()=>setshow(false)} className='p-0 py-1 px-6 block ml-auto bg-red-400'>cancel</button>
                    }
                    <form className="max-w-2xl mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='font-semibold pb-2'>your adress not added to you profile plese add your address</h2>
                        <input className="block outline-none border-b-2 w-full  mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="text" placeholder="address" {...register("address", { required: true })} />
                        {errors.address && <p className="text-red-500 ">address is required*</p>}
                        <button className="w-full max-w-xs mx-auto block bg-teal-200 cursor-pointer mt-4 rounded-lg text-black py-2 hover:bg-teal-400 transition-all" type="submit">{addingaddress ? <span className="loading loading-bars loading-sm"></span> : 'add address'}</button>
                    </form>
                </div> : <div className='max-w-2xl container mx-auto'>
                    <span>your current address <button onClick={()=>setshow(true)} className='p-0 py-1 px-6 bg-teal-200'>change</button> </span>
                    <p className='pt-2 font-semibold'>{currentUser?.address ?currentUser?.address : adressstate}</p>
                </div>
            }
            <Elements stripe={stripePromise}>
                <CheckoutForm currentUser={currentUser} adressstate={adressstate} product={product.data} />
            </Elements>
        </>
    )
}

export default Payment
