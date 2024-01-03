import React, { useContext, useEffect, useState } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import useGetallProducts from '../../Hooks/useGetallProducts'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import { FaSearch } from 'react-icons/fa'
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa6'
import SectionHeading from '../../Components/SectionHeading/SectionHeading'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { TbListDetails } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
const AllProducts = () => {
    const { currentUser } = useContext(FrankStoreData)
    const { seacrhValue, setSearchValue, categoryFilter, setCategoryFilter } = useContext(FrankStoreData)
    const axiosrequest = useAxiosrequest()
    const [categoryData, setCategoryData] = useState([])
    const [totaldata, settotaldata] = useState(0)
    const [sortBy, setSortby] = useState('none')
    const [sortValue, setSortValue] = useState('none')
    const [pageNumber, setPageNumber] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(20)
    const totalPages = Math.ceil(totaldata / itemPerPage)
    const pages = [...Array(totalPages).keys()];
    const axiosecure = useAxiosSecure()
    useEffect(() => {
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    const [isPending, allproducts, refetch] = useGetallProducts(categoryFilter, sortBy, sortValue, seacrhValue, pageNumber, itemPerPage)
    // console.log(allproducts);
    const handelCategory = (category) => {

        setCategoryFilter(category)
    }
    useEffect(() => {
        axiosrequest.get(`/productCount?seacrhValue=${seacrhValue}&categoryFilter=${categoryFilter}`)
            .then((res) => {
                settotaldata(res.data)
            })
    }, [seacrhValue, categoryFilter])
    const Deleteproducts = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "wanst to delete this product !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosecure.delete(`/products?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "product deleted succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to delete product'
                            });
                        }
                    })

            }
        });
    }
    return (
        <div className='container mx-auto py-10'>
            <h3 className='text-3xl text-center uppercase'>total {allproducts.length} products</h3>
            <Link to={'/dashboard/addclass'}><button className='flex justify-start items-center text-xl font-semibold uppercase bg-gray-300'><FaPlus />product</button></Link>
            <div className="md:block hidden cursor-pointer my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={6} spaceBetween={10} handelCategory={handelCategory} />

            </div>
            <div className="sm:block md:hidden hidden my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={4} spaceBetween={10} handelCategory={handelCategory} />
            </div>
            <div className="block sm:hidden my-11">
                <CategorySlider categoryData={categoryData} slidesPerView={2} spaceBetween={10} handelCategory={handelCategory} />
            </div>
            <div className='lg:flex justify-start items-end gap-6'>
                <span className='flex justify-between grow pb-[6px]'>
                    <span>
                        <select onInput={(e) => {

                            setSortby(e.target.value)
                        }} className=" rounded py-1 px-3 border-2 border-black">
                            <option value={'none'} selected>none</option>
                            <option value={'price'}>price</option>
                            <option value={'mostsale'}>most sale</option>
                            <option value={'quantity'}>stock</option>
                        </select>
                        {
                            (sortBy === 'price') && <select onInput={(e) => {

                                setSortValue(e.target.value)
                            }} className=" rounded py-1 px-3 border-2 border-black ml-2">
                                <option value={'LTH'} >low to high</option>
                                <option value={'HTL'} selected>high to low</option>
                            </select>
                        }

                    </span>
                    <span className='flex justify-start items-center border-2 border-black'>
                        <input onKeyUp={(e) => {

                            setSearchValue(e.target.value)
                        }} type="text" placeholder="Search" className="outline-none active:outline-none active:border-none p-2 w-full max-w-xs" />
                        <button className='rounded-none hover:text-blue-600 active:scale-95'><FaSearch /></button>
                    </span>
                </span>
            </div>
            <SectionHeading
                topheadin='Products' heading={`${categoryFilter}`}></SectionHeading>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>addedBy</th>
                            <th>price</th>
                            <th>sold</th>
                            <th>in stock</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allproducts.map(item => <tr key={item._id} item={item}>
                                <td className='w-20' ><img className='w-20  rounded-full' src={item?.productImage} alt="" /></td>
                                <td>{item?.addedBy}</td>
                                <td>${item?.price}</td>
                                <td>{item?.totalSold}</td>
                                <td>{item?.quantity == 0 ? 'out of stock' : item?.quantity}</td>
                                <td className='text-3xl flex justify-start items-center gap-2 cursor-pointer'>
                                    <Link to={`/productDeails/${item?._id}`}>
                                        <TbListDetails className='hover:text-blue-500' />
                                    </Link>
                                    <Link to={`/dashboard/updateproduct/${item._id}`}>
                                        <MdModeEditOutline />
                                    </Link>
                                    <MdDelete onClick={() => Deleteproducts(item._id)} className='hover:text-red-500 active:scale-75 transition-all' />
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                {
                    isPending && <span className="loading loading-bars loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }

            </div>
            <span className='flex justify-center flex-wrap gap-5 items-center mt-6'>
                <div className="flex justify-center space-x-1 dark:text-gray-100">
                    <button className=' text-sm font-semibold border hover:text-blue-600 rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400'>
                        <FaArrowLeft />
                    </button>
                    {
                        pages.map(item => <button onClick={() => {

                            setPageNumber(item)
                        }} key={item} type="button" title="Page 1" className="inline-flex items-center hover:text-blue-600 justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">{item + 1}</button>)
                    }
                    <button className=' text-sm font-semibold border rounded shadow-md hover:text-blue-600 dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400'>
                        <FaArrowRight />
                    </button>
                </div>
                <select onChange={(e) => {

                    setItemPerPage(e.target.value)
                    setPageNumber(0)
                }} className=" rounded py-1 px-3 border-2 border-black">
                    <option value={20} selected>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </span>
        </div>
    )
}

export default AllProducts
