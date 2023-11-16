import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from "../Layout/Home/Home";
const Routes = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home></Home>,
        },
      ]);
  return <RouterProvider router={router} />
}

export default Routes
