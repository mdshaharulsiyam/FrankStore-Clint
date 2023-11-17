import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import SliderData from "./SliderData"
import Carousel from "nuka-carousel"
const Slider = () => {
    const axiosrequest = useAxiosrequest()
    const [sliderData,setsliderData]=useState([])
    useEffect(()=>{
        axiosrequest.get('/slider').then((data)=>setsliderData(data.data))
    },[])
  return (
    <div>
      <Carousel dragging={true} speed={1000} autoplay={true} autoplayInterval={2000} wrapAround={true} >
      {
        sliderData.map(item=> <SliderData key={item._id} item={item}></SliderData>)
      }
      </Carousel>
   
    </div>
  )
}

export default Slider
