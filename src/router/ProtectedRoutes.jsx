import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ allowedRoles, redirect }) => {
  const { user } = useContext(UserContext);
  const isAuthorized = allowedRoles.includes(user?.role);
  if (user?.role == 2 || user?.role == 3) {
    redirect = "/no-auth";
  }

  return isAuthorized ? <Outlet /> : <Navigate to={redirect} replace />;
};

export default ProtectedRoute;
