import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
const Catrgoty = () => {
    const axiosrequest = useAxiosrequest()
    const [categoryData, setCategoryData] = useState([])
    useEffect(() => {
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    // sjow item by category
    const handelCategory = (category)=>{
        // console.log(category)
    }
    return (
        <div className="container mx-auto my-20">
         <SectionHeading topheadin='Categories' heading='Browse By Category'></SectionHeading>
            <div className="md:block hidden cursor-pointer">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        categoryData.map(item => <SwiperSlide key={item._id}>
                            <div onClick={()=>handelCategory(item.categoryName)} className="bg-gray-300 p-5  text-center hover:bg-red-700 hover:text-white transition-all">
                                <div className="h-10 w-10 mx-auto"><img className="w-full object-cover" src={item.categoryImage} alt="" /></div>
                                <h3 className="pt-3 font-bold">{item.categoryName}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className="sm:block md:hidden hidden">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        categoryData.map(item => <SwiperSlide key={item._id}>
                            <div onClick={()=>handelCategory(item.categoryName)} className="bg-gray-300 p-5  text-center hover:bg-red-700 hover:text-white transition-all">
                                <div className="h-10 w-10 mx-auto"><img className="w-full object-cover" src={item.categoryImage} alt="" /></div>
                                <h3>{item.categoryName}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className="block sm:hidden">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        categoryData.map(item => <SwiperSlide key={item._id}>
                            <div onClick={()=>handelCategory(item.categoryName)} className="bg-gray-300 p-5  text-center hover:bg-red-700 hover:text-white transition-all">
                                <div className="h-10 w-10 mx-auto"><img className="w-full object-cover" src={item.categoryImage} alt="" /></div>
                                <h3>{item.categoryName}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Catrgoty
