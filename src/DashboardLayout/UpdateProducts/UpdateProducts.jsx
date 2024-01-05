import React, { useContext, useEffect, useState } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const UpdateProducts = () => {
    const { currentUser } = useContext(FrankStoreData)
    const [loading, setloading] = useState(false)
    const product = useLoaderData()
    const axiosrequest = useAxiosrequest()
    const axiossecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { brand, category, date, description, price, productImage, productName, quantity, rating, review, totalSold, _id, addedBy } = product.data
    const [categoryData, setCategoryData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    const imageapikey = import.meta.env.VITE_IMAGE_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageapikey}`;
    const onSubmit = async (data) => {
        setloading(true)
        data.addedBy = currentUser?.useremail
        if (data.productName === '') data.productName = productName
        if (data.price === '') data.price = price
        if (data.brand === '') data.brand = brand
        if (data.quantity === '') data.quantity = quantity
        if (data.category === '') data.category = category
        if (data.description === '') data.description = CourseDetails?.description
        if (data.productImage.length <= 0) {
            data.productImage = productImage
        } else {
            const res = await axiosrequest.post(image_hosting_api, { image: data.productImage[0] }, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                data.productImage = res.data.data.display_url
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'unable to add update product'
                });
            }
        }
        data.quantity = parseInt(data.quantity)
        axiossecure.patch(`/products?useremail=${currentUser?.useremail}&id=${_id}`, data)
            .then((res) => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "product updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                    setloading(false)
                    navigate('/dashboard/allproduct')
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: 'unable to update product'
                    });
                    setloading(false)
                }
            })

    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="w-full mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-4xl uppercase font-semibold pb-6">update  product</h3>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" defaultValue={productName} {...register("productName")} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" defaultValue={price} {...register("price")} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" defaultValue={brand} {...register("brand")} />
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" defaultValue={quantity} {...register("quantity")} />
                <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2"  {...register("category")}>
                    {
                        categoryData.map(item => <option selected={item?.categoryName === category} key={item._id} value={`${item?.categoryName}`}>{`${item?.categoryName}`}</option>)
                    }

                </select>
                <span>chooes a image for class</span>
                <input className="file-input file-input-bordered w-full " type="file" placeholder="productImage" {...register("productImage")} />
                <p>current image for this product</p>
                <img className='w-40' src={productImage} alt="" />
                <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="text" defaultValue={description} {...register("description")} />
                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'update class'}</button>
            </form>
        </div>
    )
}

export default UpdateProducts
