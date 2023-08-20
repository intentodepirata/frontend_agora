import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ROLES } from "../constants/ROLES";

const ProtectedRoute = ({ allowedRoles, redirect }) => {
  const { user } = useContext(UserContext);

  const isAuthorized = allowedRoles.includes(user?.role);
  if (user?.role === ROLES.DEPENDIENTE || user?.role === ROLES.TECNICO) {
    redirect = "/no-auth";
  }
  if (user?.role == ROLES.IMPAGADO) {
    redirect = "/admin/suscripcion";
  }

  return isAuthorized ? <Outlet /> : <Navigate to={redirect} replace />;
};

export default ProtectedRoute;
