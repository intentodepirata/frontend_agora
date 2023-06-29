import ListBar from "../../components/ListBar/ListBar";
import { Outlet } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { useState } from "react";
import { Box, Container } from "@mui/material";
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
        <Container
          sx={{
            maxWidth: {
              xl: "xl",
              lg: "lg",
              md: "md",
              sm: "sm",
            },
          }}
        >
          <Outlet />
        </Container>
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
