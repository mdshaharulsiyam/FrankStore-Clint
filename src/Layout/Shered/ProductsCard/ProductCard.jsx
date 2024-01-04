import '@smastrom/react-rating/style.css'
import { useNavigate } from 'react-router-dom';
import './card.css'
const ProductCard = ({ item }) => {
    const { productImage, price, productName, _id, brand, description, quantity } = item;
    const navigate = useNavigate()
    const handelProductDetails = (_id) => {
        navigate(`/productDeails/${_id}`)
    }
    return (
        <div id='productCart' onClick={() => handelProductDetails(_id)} className='p-2 bg-black bg-opacity-5 relative rounded-lg cursor-pointer hover:scale-105 transition-all'>
            {
                quantity <= 0 && <div className='absolute w-full h-full bg-black bg-opacity-60 z-50 left-0 top-0 flex justify-center items-center flex-col'>
                    <img className='w-20' src='https://i.ibb.co/F4zV77y/3756312.png' alt="" />
                    <p className='text-lg uppercase font-bold text-white'>out of stock</p>
                </div>
            }
            <div id='productimageParent' className='w-full max-h-80 overflow-hidden bg-black relative'>
                <img className='w-full object-cover' src={productImage} alt="" />
            </div>
            <div id='productContent' className='hidden '>
                <p className='z-10 rounded-lg absolute font-bold bg-black top-2 right-2 p-2 text-white bg-opacity-40'>${price}</p>
                <h3 className='text-lg py-1 font-semibold text-white z-10 absolute bottom-20'>{productName}</h3>
                <p className=' py-1 text-white z-10 absolute bottom-14 '>brand : {brand}</p>
                <p className=' py-1 text-white z-10 absolute bottom-6 text-xs'>description : {description.slice(0, 50)}...</p>
            </div>
        </div>
    )
}

export default ProductCard
