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
import UserRoute from "../PrivetRoutes/UserRoute";
import AdminRoute from "../PrivetRoutes/AdminRoute";
import LoggedinUser from "../PrivetRoutes/LoggedinUser";
import { Statistic } from "../DashboardLayout/Statistic/Statistic";
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
          element: <LoggedinUser><SignUp></SignUp></LoggedinUser>,
        },
        {
          path: "/payment/:id",
          element: <UserRoute> <Payment></Payment></UserRoute>,
          loader: ({ params }) => axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: "/login",
          element: <LoggedinUser>  <Login></Login></LoggedinUser>,
        },
      ]
    },
    {
      path: '/dashboard',
      element: <UserRoute> <Dashboard /></UserRoute>,
      children: [
        {
          path: 'cart',
          element: <UserRoute> <Cart /></UserRoute>
        },
        {
          path: 'order',
          element: <UserRoute> <Order /></UserRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><User /></AdminRoute>
        },
        {
          path: 'profile',
          element: <UserRoute> <Profile /></UserRoute>
        },
        {
          path: 'allproduct',
          element: <AdminRoute> <AllProducts /></AdminRoute>
        },
        {
          path: 'allorders',
          element: <AdminRoute> <AllOrder /></AdminRoute>
        },
        {
          path: 'dashboard',
          element: <AdminRoute> <Statistic /></AdminRoute>
        },
        {
          path: 'updateproduct/:id',
          element: <AdminRoute> <UpdateProducts /></AdminRoute>,
          loader: ({ params }) => axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: 'addclass',
          element: <AdminRoute> <AddProduct /></AdminRoute>,
        },
      ]
    }
  ]);
  return <RouterProvider router={router} />
}

export default Routes
