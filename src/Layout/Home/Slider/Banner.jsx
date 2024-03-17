import { FaBagShopping } from "react-icons/fa6"
const Banner = () => {
  return (
    <div className="relative container mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 h-[400px] mt-10 mb-10">
                <div className="banner bg-banner1 relative md:col-span-3 overflow-hidden hover:bg-[160%] duration-[.6s] ">
                    <h2 className="absolute text-white left-[10%] bottom-[20%]  font-clashSemibold text-2xl">
                    Step into FrankStore: Where Quality Meets Conveniencert
                    </h2>
                </div>
                <div className="grid gap-2 grid-row-2 md:col-span-2">
                    <div className="bg-banner2 relative hover:bg-[160%] duration-[.6s] ">
                        <h2 className="absolute text-white left-[10%] bottom-[20%]  font-clashSemibold text-xl">
                        Experience FrankStore: Your Gateway to Quality Shopping
                        </h2>
                    </div>
                    <div className="bg-banner3 relative hover:bg-[160%] duration-[.6s] ">
                        <h2 className="absolute text-white left-[10%] bottom-[20%]  font-clashSemibold text-xl">
                        Unveiling FrankStore: Your Premier Marketplace Experience
                        </h2>
                    </div>
                </div>
            </div>

      {/* Banner Grid */}
    </div>
  )
}

export default Banner
