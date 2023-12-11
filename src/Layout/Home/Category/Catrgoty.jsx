import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import CategorySlider from "../../../Components/CategorySlider/CategorySlider";
const Catrgoty = () => {
    const axiosrequest = useAxiosrequest()
    const [categoryData, setCategoryData] = useState([])
    useEffect(() => {
        axiosrequest.get('/categores').then((data) => setCategoryData(data.data))
    }, [])
    const handelCategory = (category) => {
        console.log(category)
    }
    return (
        <div className="container mx-auto my-20">
            <SectionHeading topheadin='Categories' heading='Browse By Category'></SectionHeading>
            <div className="md:block hidden cursor-pointer">
                <CategorySlider categoryData={categoryData} slidesPerView={6} spaceBetween={10} handelCategory={handelCategory}/>

            </div>
            <div className="sm:block md:hidden hidden">
                <CategorySlider categoryData={categoryData} slidesPerView={4} spaceBetween={10} handelCategory={handelCategory}/>
            </div>
            <div className="block sm:hidden">
                <CategorySlider categoryData={categoryData} slidesPerView={2} spaceBetween={10} handelCategory={handelCategory}/>
            </div>
        </div>
    )
}

export default Catrgoty
