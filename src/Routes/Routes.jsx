import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from "../Layout/Home/Home";
import Root from "../Layout/Root/Root";
import SignUp from "../Layout/SignUp/SignUp";
import Login from "../Layout/Login/Login";
import Dashboard from "../DashboardLayout/Dashboard/Dashboard";
import Products from "../Layout/Products/Products";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import ProductsDetails from "../Layout/ProductsDetails/ProductsDetails";
import Payment from "../Layout/Payment/Payment";
import Cart from "../DashboardLayout/Cart/Cart";
import Order from "../DashboardLayout/Order/Order";
import User from "../DashboardLayout/Users/User";
import Profile from "../DashboardLayout/Profile/Profile";
import AllProducts from "../DashboardLayout/AllProducts/AllProducts";
import UpdateProducts from "../DashboardLayout/UpdateProducts/UpdateProducts";
import AddProduct from "../DashboardLayout/AddProduct/AddProduct";
import AllOrder from "../DashboardLayout/AllOrder/AllOrder";
const Routes = () => {
  const axiosrequest = useAxiosrequest()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/products",
          element: <Products></Products>,
          loader: () => axiosrequest.get('/productCount')
        },
        {
          path: "/productDeails/:id",
          element: <ProductsDetails></ProductsDetails>,
          loader: ({ params }) => axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path: "/payment/:id",
          element: <Payment></Payment>,
          loader: ({ params }) => axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'cart',
          element : <Cart/>
        },
        {
          path: 'order',
          element : <Order/>
        },
        {
          path: 'users',
          element : <User/>
        },
        {
          path: 'profile',
          element : <Profile/>
        },
        {
          path: 'allproduct',
          element : <AllProducts/>
        },
        {
          path: 'allorders',
          element : <AllOrder/>
        },
        {
          path: 'updateproduct/:id',
          element : <UpdateProducts/>,
          loader: ({ params }) => axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: 'addclass',
          element : <AddProduct/>,
        },
      ]
    }
  ]);
  return <RouterProvider router={router} />
}

export default Routes
