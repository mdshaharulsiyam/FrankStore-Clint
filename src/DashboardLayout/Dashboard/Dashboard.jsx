import { useContext } from "react"
import { FrankStoreData } from "../../Context/FrankStoreContext"
import { Link, NavLink, Outlet } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { GiShop } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
const Dashboard = () => {
    const { currentUser, logout } = useContext(FrankStoreData)
    const userMenu = <>
        <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-800 dark:text-gray-50">
                <NavLink to={'profile'} className="flex items-center p-2 space-x-3 rounded-md">
                    <CgProfile className="text-2xl" />
                    <span>Profile</span>
                </NavLink>
            </li>

            <li>
                <NavLink to={'order'} className="flex items-center p-2 space-x-3 rounded-md">
                    <FaShoppingBag className="text-2xl" />
                    <span>my Orders</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'cart'} className="flex items-center p-2 space-x-3 rounded-md">
                    <HiUserGroup className="text-2xl" />
                    <span>Cart</span>
                </NavLink>
            </li>
        </ul></>
    const adminMenu = <>
        <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-800 dark:text-gray-50">
                <NavLink to={'profile'} className="flex items-center p-2 space-x-3 rounded-md">
                    <CgProfile className="text-2xl" />
                    <span>Profile</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'allproduct'} className="flex items-center p-2 space-x-3 rounded-md">
                    <GiShop className="text-2xl" />
                    <span>products</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'allorders'} className="flex items-center p-2 space-x-3 rounded-md">
                    <FaCartFlatbedSuitcase className="text-2xl" />
                    <span>all Orders</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'order'} className="flex items-center p-2 space-x-3 rounded-md">
                    <FaShoppingBag className="text-2xl" />
                    <span>my Orders</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'cart'} className="flex items-center p-2 space-x-3 rounded-md">
                    <IoCartOutline className="text-2xl" />
                    <span>Cart</span>
                </NavLink>
            </li>
            <li>
                <NavLink to={'users'} className="flex items-center p-2 space-x-3 rounded-md">
                    <HiUserGroup className="text-2xl" />
                    <span>users</span>
                </NavLink>
            </li>
        </ul>
    </>
    // console.log(currentUser)

    return (
        <div className='text-left grid grid-cols-4 container mx-auto'>
            <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
                <div className="flex items-center p-2 space-x-4">
                    <img src={currentUser?.profileImage} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                    <div>
                        <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
                        <span className="flex items-center space-x-1">
                            <p rel="noopener noreferrer" className="text-xs hover:underline dark:text-gray-400">{currentUser?.role}</p> <span className="h-2 w-2 rounded-full bg-green-600"></span>
                        </span>
                    </div>
                </div>
                <div className="divide-y dark:divide-gray-700">
                    {
                        (currentUser?.role === 'owner' || currentUser?.role === 'admin') ? adminMenu : userMenu
                    }
                    <ul className="pt-4 pb-2 space-y-1 text-sm">
                        <li>
                            <Link to={'/'} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <FaHome className="text-2xl" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className="flex items-center p-2 space-x-3 rounded-md bg-transparent active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current dark:text-gray-400">
                                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                    <rect width="32" height="64" x="256" y="232"></rect>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-span-3">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
