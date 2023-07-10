import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { Box } from "@mui/material";
import useScrollUp from "../../hooks/useScrollUp";
import Footer from "../../components/Footer/Footer";
import HeaderBarAdmin from "../../components/HeaderBarAdmin/HeaderBarAdmin";
import ListBarAdmin from "../../components/ListBarAdmin/ListBarAdmin";
import { AnimatedOutlet } from "../../components/AnimatedOutlet/AnimatedOutlet";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const AdminLayout = () => {
  const [showDrawer, setShowDrawer] = useState(true);
  const nodeRef = useRef(null);
  const location = useLocation();
  useScrollUp();
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
