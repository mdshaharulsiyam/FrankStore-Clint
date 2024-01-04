import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FrankStoreData } from "../../Context/FrankStoreContext"
import useAxiosrequest from "../../Hooks/useAxiosrequest"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const AddProduct = () => {
    const { currentUser } = useContext(FrankStoreData)
    const axiosrequest = useAxiosrequest()
    const axiossecure = useAxiosSecure()
    const [loading, setloading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const navigate = useNavigate()
    const imageapikey = import.meta.env.VITE_IMAGE_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageapikey}`;
    useEffect(() => {
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    const onSubmit = async (data) => {
        data.totalSold = parseInt(0)
        data.addedBy = currentUser?.useremail
        data.price = parseInt(data.price)
        data.quantity = parseInt(data.quantity)
        data.review = parseInt(0)
        data.rating = parseInt(0)
        setloading(true)
        const image = {
            image: data.productImage[0]
        }
        const res = await axiosrequest.post(image_hosting_api, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            data.productImage = res.data.data.display_url
            axiossecure.post(`/products?useremail=${currentUser?.useremail}`, data)
                .then((res) => {
                    if (res.data.acknowledged) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "new product added succesfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        reset()
                        setloading(false)
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: 'unable to add new product request'
                        });
                    }

                })

        } else {
            setloading(false)
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'unable to add new product'
            });
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form className="w-full mx-auto pb-12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-4xl uppercase font-semibold pb-6">add a new product</h3>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="product Name" {...register("productName", { required: true })} />
                {errors.productName && <p className="text-red-500 ">product Name is required*</p>}
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" placeholder="price" {...register("price", { required: true })} />
                {errors.price && <p className="text-red-500 ">price is required*</p>}
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="text" placeholder="brand" {...register("brand", { required: true })} />
                {errors.brand && <p className="text-red-500 ">brand is required*</p>}
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2" type="number" placeholder="quantity" {...register("quantity", { required: true })} />
                {errors.quantity && <p className="text-red-500 ">quantity is required*</p>}
                <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400 my-2"  {...register("category", { required: true })}>
                    <option value={''} selected>select a category</option>
                    {
                        categoryData.map(item => <option key={item._id} value={`${item?.categoryName}`}>{`${item?.categoryName}`}</option>)
                    }

                </select>
                {errors.category && <p className="text-red-500 ">category is required*</p>}
                <span>chooes a image for class</span>
                <input className="file-input file-input-bordered w-full " type="file" placeholder="image" {...register("productImage", { required: true })} />
                {errors.productImage && <p className="text-red-500 ">product Image is required*</p>}
                <textarea className="block outline-none border-b-2 w-full mx-auto p-2 h-20 resize-none pl-0 border-b-gray-400 my-2" type="number" placeholder="description" {...register("description", { required: true })} />
                {errors.description && <p className="text-red-500 ">description is required*</p>}
                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'Add product'}</button>
            </form>
        </div>
    )
}

export default AddProduct
