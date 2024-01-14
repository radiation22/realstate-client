/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();
  //   if (loading) {
  //     return (
  //       <div className="text-center">
  //         <button className="btn loading">loading</button>
  //       </div>
  //     );
  //   }
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
