import React, { useContext, useState } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import useGetMyOrder from '../../Hooks/useGetMyOrder'
import { TbListDetails } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import StarRatings from 'react-star-ratings';
import { useForm } from 'react-hook-form'
import { FaRegWindowClose } from 'react-icons/fa'
import { MdFeedback } from 'react-icons/md'
const Order = () => {
  const { currentUser } = useContext(FrankStoreData)
  const [isPending, OrderData, refetch] = useGetMyOrder(currentUser?.useremail)
  const [show, setshow] = useState(false)
  const [submitingFeedbcak, setsubmitingFeedbcak] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  // console.log(OrderData);
  const axiosequre = useAxiosSecure()
  const deleteitem = (id) => {
    axiosequre.delete(`/order?useremail=${currentUser?.useremail}&id=${id}`)
      .then((res) => {
        refetch()
        console.log(res.data)
      })
  }
  const axiossecure = useAxiosSecure()
  const [rating, setrating] = useState(5)
  const onSubmit = async (data) => {
    setsubmitingFeedbcak(true)
    const feedback = {
      course: id,
      title: CourseDetails?.title,
      rating: rating,
      description: data.description,
      username: currentUser?.username,
      userimage: currentUser?.profileImage
    }
    axiossecure.post(`/feedback?useremail=${currentUser?.useremail}`, feedback)
      .then((res) => {
        if (res.data.success) {
          setshow(false)
          reset()
          setsubmitingFeedbcak(false)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "feedback sent succesfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'unable to submit feedback'
          });
          setsubmitingFeedbcak(false)
        }
      })
  }
  return (
    <>
      <h3 className='text-3xl text-center font-semibold pt-7'>my order</h3>
      <p>total order {OrderData.length}</p>
      <div className='md:grid grid-cols-2 gap-4 container mx-auto'>
        {
          OrderData?.map(item => <div className="flex flex-col py-6 relative shadow-2xl p-2 sm:flex-row sm:justify-between">
            <div className="flex w-full items-center space-x-2 sm:space-x-4">
              <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item?.myOrder[0]?.productImage} alt="Polaroid camera" />
              <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leadi sm:pr-8">{item?.myOrder[0]?.productName}</h3>
                    <p className="text-sm font-semibold">payment ${item?.myOrder[0]?.price}</p>
                    <p className="text-sm dark:text-gray-400">transitionId : {item?.transitionId}</p>
                    <p className="text-sm dark:text-gray-400">address : {item?.address}</p>
                    <p>status : {item?.status}</p>
                  </div>
                </div>
                <div className="flex text-sm divide-x">
                  {
                    item?.status !== "pending" && <button onClick={() => deleteitem(item?._id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1  hover:text-red-600 active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>delete</span>
                    </button>
                  }

                  <Link to={`/productDeails/${item?.myOrder[0]?._id}`}>
                    <button type="button" className="flex items-center px-2 py-1 space-x-1 hover:text-green-600 active:scale-95">
                      <TbListDetails className="text-xl" />
                      <span className="uppercase">details</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {
              item?.status === 'deliverd' && <button onClick={() => setshow(true)} className='block right-3 top-3 absolute bg-orange-400 font-semibold hover:bg-orange-700 hover:text-white transition-all p-0 py-1 px-1 text-3xl'><MdFeedback /></button>
            }

          </div>)
        }

      </div>
      {
        show && <div className="flex justify-center flex-col items-center absolute bg-white shadow-2xl p-6 pb-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <form className="max-w-2xl mx-auto pb-12 min-w-[320px]" onSubmit={handleSubmit(onSubmit)}>
            <FaRegWindowClose onClick={() => setshow(false)} className='ml-auto text-2xl m-2 hover:text-red-500 cursor-pointer' />
            <h2 className='font-semibold pb-2'>Leave your feedback</h2>
            <div>
              <StarRatings
                rating={rating}
                starRatedColor="orange"
                starHoverColor="orange"
                changeRating={(r) => setrating(r)}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="5px"
                name='rating'
              />
            </div>
            {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}
            <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="number" placeholder="description" {...register("description", { required: true })} />
            {errors.description && <p className="text-red-500 ">description is required*</p>}
            <button className="w-full bg-red-600 cursor-pointer mt-4 rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{submitingFeedbcak ? <span className="loading loading-bars loading-sm"></span> : 'send feedback'}</button>
          </form>
        </div>
      }
    </>
  )
}

export default Order
