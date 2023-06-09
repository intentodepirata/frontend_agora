import { useUserContext } from "../contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ ROLES }) => {
  const { user } = useUserContext();
  const { pathname, location } = useLocation();

  if (pathname == "/admin-panel" && user?.admin !== ROLES.ADMIN) {
    console.log("no puedes entrar aqui cliente");
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  if (pathname == "/mis-pedidos" && !user) {
    console.log("no puedes entrar aqui sin loguearte");
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  if (pathname == "/user-config" && !user) {
    console.log("no puedes entrar aqui sin loguearte");
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
