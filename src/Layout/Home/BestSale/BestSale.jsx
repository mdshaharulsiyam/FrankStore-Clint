import { useEffect, useState } from "react"
import useAxiosrequest from "../../../Hooks/useAxiosrequest"
import SectionHeading from "../../../Components/SectionHeading/SectionHeading"
import BestSaleData from "./BestSaleData"

const BestSale = () => {
    const axiosrequest = useAxiosrequest()
    const [bestSaleData, setBestSaleData] = useState([])
    useEffect(() => {
        axiosrequest.get('/bestsale').then((data) => setBestSaleData(data.data))
    }, [])
    // console.log(bestSaleData)
    return (
        <div className="container mx-auto my-14">
            <SectionHeading topheadin='Featured' heading='Best Sales' />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {
                    bestSaleData.map(item => <BestSaleData key={item._id} item={item} />)
                }
            </div>
        </div>
    )
}

export default BestSale
