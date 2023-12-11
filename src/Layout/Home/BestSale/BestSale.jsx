import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import SectionHeading from "../../../Components/SectionHeading/SectionHeading"
import ProductCard from "../../Shered/ProductsCard/ProductCard"

const BestSale = () => {
    const axiosrequest = useAxiosrequest()
    const [bestSaleData, setBestSaleData] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axiosrequest.get('/bestsale').then((data) => {
            setBestSaleData(data.data)
            setloading(false)
        })
    }, [])
    // console.log(bestSaleData)
    return (
        <div className="container mx-auto my-14">
            <SectionHeading topheadin='Featured' heading='Best Sales' />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 py-4 relative">
                {
                    bestSaleData.map(item => <ProductCard key={item._id} item={item} />)
                }
                {
                    loading && <span className="loading loading-bars loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }
            </div>
        </div>
    )
}

export default BestSale
