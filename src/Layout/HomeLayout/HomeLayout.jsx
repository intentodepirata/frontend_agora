import ListBar from "../../components/ListBar/ListBar";
import { useLocation } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useRef } from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet/AnimatedOutlet";

const HomeLayout = () => {
  const [showDrawer, setShowDrawer] = useState(true);
  const [isXsScreen, setIsXsScreen] = useState(false);
  const nodeRef = useRef(null);
  const location = useLocation();
  useScrollUp();

  const handleOpenCloseDrawer = () => {
    setShowDrawer((currentStatus) => !currentStatus);
  };

  // Verificar el tamaño de la pantalla al cargar la página
  useEffect(() => {
    function handleResize() {
      setShowDrawer(window.innerWidth > 600);
      setIsXsScreen(window.innerWidth > 600);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              classNames="page-transition"
              timeout={200}
            >
              <div ref={nodeRef}>
                <AnimatedOutlet />
              </div>
            </CSSTransition>
          </SwitchTransition>
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
