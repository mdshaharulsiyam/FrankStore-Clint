// import Header from "../Shered/Header/Header"
import Catrgoty from "./Category/Catrgoty";
import BestSale from "./BestSale/BestSale";
import OurProducts from "./OurProducts/OurProducts";
import Supports from "./Supports/Supports";
import Discover from "./Slider/Discover";
import Banner from "./Slider/Banner";
const Home = () => {
  return (
    <>
    {/* <Header /> */}
   <Discover />
   <Banner />
   <BestSale />
   <Catrgoty />
   <OurProducts />
   <Supports />
   
    </>
  )
}

export default Home
