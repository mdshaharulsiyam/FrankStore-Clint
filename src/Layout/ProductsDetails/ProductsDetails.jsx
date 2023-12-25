import { Link, useLoaderData } from "react-router-dom"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaArrowRightArrowLeft, FaCartPlus } from "react-icons/fa6"
import { FaShippingFast, FaShoppingCart } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import useAxiosrequest from '../../Hooks/useAxiosrequest'
import ProductCard from "../Shered/ProductsCard/ProductCard"
import SectionHeading from "../../Components/SectionHeading/SectionHeading"
import { FrankStoreData } from "../../Context/FrankStoreContext"
import useAxiosSecure from "../../Hooks/useAxiosSecure"
import Swal from "sweetalert2"
const ProductsDetails = () => {
  const { currentUser } = useContext(FrankStoreData)
  const product = useLoaderData()
  const axiosrequest = useAxiosrequest()
  const axiosecure = useAxiosSecure()
  const [loading, setloading] = useState(false)
  // console.log(product.data)
  const { brand, category, date, description, price, productImage, productName, quantity, rating, review, totalSold, _id } = product.data
  const [relaventData, setRelaventData] = useState([])
  // console.log(category)
  useEffect(() => {
    axiosrequest.get(`/relaventdata?category=${category}`).then((data) => setRelaventData(data.data))
  }, [])
  const addtoCart = () => {
    setloading(true)
    if (!currentUser?.useremail) {
      setloading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please login first",
      });
    }
    const cartData = {
      user: currentUser.useremail,
      itemId: _id
    }
    axiosecure.post('/Cart', cartData).then((data) => {
      setloading(false)
      if (data.data.msg === 'Item already added') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "item already aded to cart",
        });
      }
      console.log(data.data)
    })
    // console.log(cartData);
  }
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 container mx-auto my-28 items-center">
        <div>
          <img className="w-full object-cover" src={productImage} alt="" />
        </div>
        <div className="pl-4">
          <h3 className="text-2xl font-bold">{productName}</h3>
          <div className='flex justify-start items-center gap-2 py-2'>
            <Rating
              style={{ maxWidth: 100 }}
              readOnly
              orientation="horizontal"
              value={rating / review}
            /> <p className='font-medium'>({review} Reviews)</p>
          </div>
          <p className="font-medium text-2xl">${price}</p>
          <span className="flex justify-start gap-2 items-center flex-wrap font-medium py-1"><p>in stock ({quantity})</p><p>total Sold ({totalSold})</p></span>
          <p>Brad : <span className="font-bold uppercase">{brand}</span></p>
          <p className="text-sm tracking-[1px] py-2 pb-4">{description}</p>
          <button onClick={addtoCart} className="bg-orange-400 text-white m-2 hover:text-black transition-all hover:bg-opacity-70 hover:scale-110 active:scale-95">
            {loading ? 'please wait...' : 'Add to cart'}
          </button>
          <Link to={`/payment/${_id}`}>
            <button className="bg-orange-600 text-white m-2 hover:text-black transition-all hover:bg-opacity-70 hover:scale-110 active:scale-95">
              buy now
            </button>
          </Link>
          <div className="border-2 p-2 mt-4">
            <div className="flex justify-start items-center gap-3 py-4 border-b-2">
              <FaShippingFast className="text-2xl" />
              <span>
                <h2 className="font-semibold">Fast Delivery</h2>
                <p className="text-xs max-w-[350px]">Efficient and expedited delivery ensures swift shipping without compromising the integrity of the products.</p>
              </span>
            </div>
            <div className="flex justify-start items-center gap-3 py-4  ">
              <FaArrowRightArrowLeft className="text-2xl" />
              <span>
                <h2 className="font-semibold">Return policy</h2>
                <p className="text-xs">Free 30 Days Delivery Returns. Details</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link to={-1} className="block text-center"><button className="bg-red-600 text-white px-10 mb-4 hover:scale-105 active:scale-95 transition-all">back</button></Link>
      <div className="container mx-auto">
        <SectionHeading topheadin={`${category}`} heading={`more products in this category`}></SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 py-3">
          {
            relaventData.map(item => <ProductCard key={item._id} item={item} />)
          }
        </div>
      </div>
    </>
  )
}

export default ProductsDetails
