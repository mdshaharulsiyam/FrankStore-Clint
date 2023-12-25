import { Outlet } from "react-router-dom"
import Header from "../Shered/Header/Header"
import Footer from "../Shered/Footer/Footer"
const Root = () => {
    return (
        <>
        <h2 className="bg-red-200 text-black text-center py-4">development in progress</h2>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
