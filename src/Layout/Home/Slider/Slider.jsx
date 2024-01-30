import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import SliderData from "./SliderData"
import Carousel from "nuka-carousel"
import { FaBagShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
const Slider = () => {
  // const axiosrequest = useAxiosrequest()
  // const [sliderData,setsliderData]=useState([])
  // useEffect(()=>{
  //     axiosrequest.get('/slider').then((data)=>setsliderData(data.data))
  // },[])
  return (
    <div className="relative">
      <img className="h-[600px] w-full object-cover" src="https://i.ibb.co/tDDPXtV/Blue-and-Yellow-Modern-Business-E-Commerce-Presentation-Template.png" alt="" />
      <div className="absolute top-[50%] translate-y-[-50%] text-white md:px-16 px-8">
        <h2 className="text-xl uppercase font-semibold max-w-3xl">Step into a World of Possibilities with FrankStore  Your Trusted Online Marketplace!</h2 >
        <p className="pt-6 max-w-3xl">Welcome to FrankStore, your go-to destination for curated essentials and stylish finds. Explore a world of quality products, unbeatable prices, and a seamless shopping experience. Discover the joy of smart and savvy shopping at FrankStore – where every purchase tells a story of quality and convenience</p>
        <Link to={'/products'}>
        <button className="text-black mt-3 flex justify-start items-center uppercase gap-2 bg-gray-300"><FaBagShopping className="-mt-1" /> shop now</button>
        </Link>
      </div>
      {/* <Carousel dragging={true} speed={1000} autoplay={true} autoplayInterval={2000} wrapAround={true} >
      {
        sliderData.map(item=> <SliderData key={item._id} item={item}></SliderData>)
      }
      </Carousel> */}

    </div>
  )
}

export default Slider
