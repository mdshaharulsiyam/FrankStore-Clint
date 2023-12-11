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
const Routes = () => {
  const axiosrequest =useAxiosrequest()
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
          loader : ()=> axiosrequest.get('/productCount')
        },
        {
          path: "/productDeails/:id",
          element: <ProductsDetails></ProductsDetails>,
          loader : ({params})=> axiosrequest.get(`/productDetails?id=${params.id}`)
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path: "/payment/:id",
          element: <Payment></Payment>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
      ]
    },
    {
      path : '/dashboard',
      element : <Dashboard />,
      children : [

      ]
    }
  ]);
  return <RouterProvider router={router} />
}

export default Routes
