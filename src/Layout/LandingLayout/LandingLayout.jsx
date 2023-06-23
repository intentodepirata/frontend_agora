import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";

const LandingLayout = () => {
  useScrollUp();
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('/img/background-landpage.svg')",
          backgroundColor: "#F3F4F6",
          backgroundPosition: "100%",
          backgroundSize: "cover",
          backgroundOrigin: "content-box",
        }}
      >
        <Box sx={{ height: "100vh" }}>
          <Header />
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default LandingLayout;
