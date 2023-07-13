import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useRef } from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet/AnimatedOutlet";
const LandingLayout = () => {
  const nodeRef = useRef(null);
  const location = useLocation();
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
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              classNames="page-transition"
              timeout={200}
            >
              <Box mb={10} ref={nodeRef}>
                <AnimatedOutlet />
              </Box>
            </CSSTransition>
          </SwitchTransition>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default LandingLayout;
