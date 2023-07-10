import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";
import HeaderBarAdmin from "../../components/HeaderBarAdmin/HeaderBarAdmin";
import ListBarAdmin from "../../components/ListBarAdmin/ListBarAdmin";

const AdminLayout = () => {
  useScrollUp();
  const [showDrawer, setShowDrawer] = useState(true);
  const handleOpenCloseDrawer = () => {
    setShowDrawer((currentStatus) => !currentStatus);
  };
  return (
    <>
      <HeaderBarAdmin handleOpenCloseDrawer={handleOpenCloseDrawer} />
      <ListBarAdmin showDrawer={showDrawer} />
      <Box
        component="main"
        sx={{
          marginLeft: showDrawer ? "16rem" : "64px",
          mt: "64px",
        }}
      >
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: 2 }}>
          <Outlet />
        </Box>
      </Box>
      <Box
        component={"footer"}
        sx={{ marginLeft: showDrawer ? "16rem" : "64px", mt: "64px" }}
      >
        <Footer />
      </Box>
    </>
  );
};

export default AdminLayout;
