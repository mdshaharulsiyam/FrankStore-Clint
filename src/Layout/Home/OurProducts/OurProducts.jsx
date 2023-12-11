import SectionHeading from "../../../Components/SectionHeading/SectionHeading"
import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import ProductCard from "../../Shered/ProductsCard/ProductCard"
import { Link } from "react-router-dom"
const OurProducts = () => {
    const axiosrequest = useAxiosrequest()
    const [loading, setloading] = useState(true)
    const [OurProducts, setOurProducts] = useState([])
    useEffect(() => {
        axiosrequest.get('/exploreproducts').then((data) => {
            setOurProducts(data.data)
            setloading(false)
        })
    }, [])
    return (
        <div className="container mx-auto my-20">
            <SectionHeading topheadin='Our Products' heading='Explore Our Products' />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 py-3 relative">
                {
                    OurProducts.map(item => <ProductCard key={item._id} item={item} />)
                }
                {
                   loading && <span className="loading loading-bars loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }
            </div>

            {
                OurProducts.length > 0 && <Link to={'/products'}><button className="text-center text-white bg-red-600 mx-auto block mt-7 hover:scale-105 transition-all hover:bg-opacity-90">View All Products</button></Link>
            }
        </div>
    )
}

export default OurProducts
