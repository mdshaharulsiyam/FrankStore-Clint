import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import './header.css'
import { useContext, useState } from "react";
import { FrankStoreData } from "../../../Context/FrankStoreContext";
import CartItemModal from "../CartItemModal/CartItemModal";
import useGetCartData from "../../../Hooks/useGetCartData";
const Header = () => {
    const { seacrhValue, setSearchValue, currentUser, logout } = useContext(FrankStoreData)
    const [isPending, cartData, refetch] = useGetCartData(currentUser?.useremail)
    const [CartItemShow, setCartItemShow] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const navlink = <>
        <NavLink to={'/'} className={`text-black menus`}>Home</NavLink>
        <NavLink to={'/about'} className={`text-black menus`}>About</NavLink>
        <NavLink to={'/contact'} className={`text-black menus`}>Contact</NavLink>
        {
            currentUser?.useremail && <NavLink to={'/dashboard'} className={`text-black menus`}>Dashboard</NavLink>
        }
        {
            currentUser?.useremail ? <button onClick={logout} className="active:scale-90">Logout</button> : <NavLink to={'/signup'} className={`text-black menus`}>Sign Up</NavLink>
        }
    </>
    const showCartItem = () => {
        setCartItemShow(!CartItemShow)
    }
    const search = e => {
        e.preventDefault()
        navigate('/products ')
        setSearchValue(e.target.searchvalue.value)
    }
    return (
        <header className="flex relative flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
            <nav className="relative lg:container w-full mx-auto px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between">
                    <Link to={'/'} className="flex-none font-bold text-2xl text-black dark:text-white hidden lg:block" aria-label="Brand">FrankStore</Link>
                    <div className="sm:hidden block">
                        <div className="flex justify-end items-center gap-2">
                            {
                                location?.pathname !== "/products" && <form>
                                    <div className="relative z-10 flex space-x-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                        <div className="flex-[1_0_0%]">
                                            <label for="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">What are you looking for?</span></label>
                                            <input type="email" name="hs-search-article-1" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Search" />
                                        </div>
                                        <button className="absolute top-[50%] font-extrabold right-1 active:scale-90 hover:bg-blue-600 hover:bg-opacity-25 -translate-y-[50%] bg-transparent p-2 "><IoSearchOutline /></button>
                                    </div>
                                </form>
                            }
                            {
                                currentUser?.useremail && <Link><img className="w-10 h-10 rounded-full" src={currentUser?.profileImage} alt="" /></Link>
                            }
                            <button className="active:scale-90 text-3xl hover:bg-blue-600 hover:bg-opacity-25 bg-transparent p-2 relative"><IoCartOutline />
                                <span className="absolute -top-2 bg-red-500 rounded-full text-sm p-1 text-white right-0">0</span>
                            </button>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <button type="button" className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                            <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block">
                    <div id="menuitem" className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-2 sm:mt-0 sm:ps-3">
                        {navlink}
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div className="flex justify-end items-center gap-2">
                        {
                            location?.pathname !== "/products" && <form onSubmit={search}>
                                <div className="relative z-10 flex space-x-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                                    <div className="flex-[1_0_0%]">
                                        <label for="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">What are you looking for?</span></label>
                                        <input type="text" name="searchvalue" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Search" />
                                    </div>
                                    <button className="absolute top-[50%] font-extrabold right-1 active:scale-90 hover:bg-blue-600 hover:bg-opacity-25 -translate-y-[50%] bg-transparent p-2 "><IoSearchOutline /></button>
                                </div>
                            </form>
                        }
                        {
                            currentUser?.useremail && <Link><img className="w-10 h-10 rounded-full" src={currentUser?.profileImage} alt="" /></Link>
                        }

                        <button onClick={showCartItem} className="active:scale-90 text-3xl hover:bg-blue-600 hover:bg-opacity-25 bg-transparent p-2 relative"><IoCartOutline />
                            <span className="absolute -top-2 bg-red-500 rounded-full text-sm p-1 text-white right-0">{cartData.length}</span>
                        </button>
                    </div>
                </div>
            </nav>
            {
                CartItemShow && <CartItemModal cartData={cartData} refetch={refetch} setCartItemShow={setCartItemShow} />
            }
        </header>
    )
}

export default Header
