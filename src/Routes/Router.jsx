import {
    createBrowserRouter,
  
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import SecureRoute from "./SecureRoute";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/Additem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/updateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";




 export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>

        },
        {
          path: 'menu',
          element:  <SecureRoute>
            <Menu></Menu>
          </SecureRoute>
           
          
            
          
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element:<Login></Login>
        },
        {
          path: 'signup',
          element:<SignUp></SignUp>
        }
      
      ]
    },
    {
      path: 'dashboard',
      element: <SecureRoute><DashBoard></DashBoard></SecureRoute>,
      children: [

        // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>

        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element:<Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },

        // admin routes
        {
          path: 'adminHome',

          element:<AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>

        },
        {
          path: 'addItem',
          element: <AdminRoute><AddItem></AddItem></AdminRoute>

        },
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          
        

        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      

      ]
      
    }
  ]);

 