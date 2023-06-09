import React from "react";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { user } = useUserContext();
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoutes;
