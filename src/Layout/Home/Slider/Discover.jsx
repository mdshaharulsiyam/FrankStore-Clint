import { FaBagShopping } from "react-icons/fa6"
import { Link } from 'react-router-dom'
const Discover = () => {
    return (
        <div className="container mx-auto">
               <div className=" py-10 pt-16 w-full grid grid-cols-1 md:grid-cols-5  ">
        <h1 className="text-xl font-clashBold md:col-span-3 sm:text-2xl md:text-3xl lg:text-4xl">
        Step into a World of Possibilities with FrankStore  Your Trusted Online Marketplace!
        </h1>
        <div className="md:col-span-2 ">
          <p className="font-poppins text-[12px] md:text-sm text-gray-400 mb-4 ">
          Welcome to FrankStore, your go-to destination for curated essentials and stylish finds. Explore a world of quality products, unbeatable prices, and a seamless shopping experience. Discover the joy of smart and savvy shopping at FrankStore – where every purchase tells a story of quality and convenience
          </p>
          <Link to={'/products'}>
        <button className="text-black mt-3 flex justify-start items-center uppercase gap-2 bg-gray-300"><FaBagShopping className="-mt-1" /> shop now</button>
        </Link>
        </div>
      </div>
        </div>
    )
}

export default Discover
