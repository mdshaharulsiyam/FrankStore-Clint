import '@smastrom/react-rating/style.css'
import { Link, useNavigate } from 'react-router-dom';
import './card.css'
import { FaCartPlus, FaEye } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FrankStoreData } from '../../../Context/FrankStoreContext';
import { useContext, useState } from 'react';
const ProductCard = ({ item }) => {
    const { currentUser } = useContext(FrankStoreData)
    const axiosecure = useAxiosSecure()
    const [loading, setloading] = useState(false)
    const { productImage, price, productName, _id, brand, quantity } = item;
    const addtoCart = () => {
        Swal.fire({
          title: "Are you sure?",
          text: `you want's to add ${productName} to cart`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            setloading(true)
            if (!currentUser?.useremail) {
              setloading(false)
             return Swal.fire({
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
              } else {
                refetch()
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${productName} added to cart succesfully`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
        
            })
          }
        });
        
        // console.log(cartData);
      }
    return (
        <div id='productCart'  className='p-2 2xl:h-80 lg:h-64 md:h-[290px] sm:h-80 bg-black bg-opacity-5 relative rounded-lg cursor-pointer hover:scale-105 transition-all overflow-hidden'>
            {
                quantity <= 0 && <div className='absolute w-full h-full bg-black bg-opacity-60 z-50 left-0 top-0 flex justify-center items-center flex-col'>
                    <img className='w-20' src='https://i.ibb.co/F4zV77y/3756312.png' alt="" />
                    <p className='text-lg uppercase font-bold text-white'>out of stock</p>
                </div>
            }
            <div id='productimageParent' className='w-full h-full overflow-hidden relative'>
                <img className='w-full h-full object-cover transition-all' src={productImage} alt="" />
            </div>
            <div id='productContent' className=' absolute  bg-black bg-opacity-50 w-full h-full '>
                <p className='z-10 rounded-lg absolute font-bold bg-black top-2 right-2 p-2 text-white bg-opacity-40'>${price}</p>
                <h3 className='sm:text-lg text-base py-1 font-semibold text-white z-10 '>{productName}</h3>
                <p className=' py-1 text-white z-10 sm:block'>brand : {brand}</p>
                <span className='flex justify-center items-center gap-2'>
                    <Link to={`/productDeails/${_id}`}>
                        <button>
                            <FaEye />
                        </button>
                    </Link>
                    <button onClick={()=>addtoCart()}>
                        <FaCartPlus />
                    </button>
                </span>
            </div>
        </div>
    )
}

export default ProductCard
