import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Login from "../Login/Login";
import Main from "./Main";
import AddProperty from "../Seller/AddProperty";
import Details from "../ShowDetials/Details";
import AllProperty from "../AllProperty/AllProperty";
import MyProperty from "../MyProperty/MyProperty";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerForm from "../SellerForm/SellerForm";
import UserForm from "./../UserForm/UserForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    // errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <Main></Main>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/addProperty",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/allProperty",
        element: <AllProperty></AllProperty>,
      },
      {
        path: "/myProperty",
        element: <MyProperty></MyProperty>,
      },
      {
        path: "/sellerForm",
        element: <SellerForm></SellerForm>,
      },
      {
        path: "/userForm",
        element: <UserForm></UserForm>,
      },
    ],
  },
]);
