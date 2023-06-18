import ListBar from "../../components/ListBar/ListBar";
import { Outlet } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { useState } from "react";
import { Box } from "@mui/material";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";

const HomeLayout = () => {
  useScrollUp();
  const [showDrawer, setShowDrawer] = useState(true);
  const handleOpenCloseDrawer = () => {
    setShowDrawer((currentStatus) => !currentStatus);
  };
  return (
    <>
      <HeaderBar handleOpenCloseDrawer={handleOpenCloseDrawer} />
      <ListBar showDrawer={showDrawer} />
      <Box
        component="main"
        sx={{
          marginLeft: showDrawer ? "16rem" : "64px",
          mt: "64px",
        }}
      >
        <Outlet />
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

export default HomeLayout;
