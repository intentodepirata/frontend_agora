import { Box } from "@mui/material";
import FormRegister from "../components/FormRegister/FormRegister";

const Register = () => {
  return (
    <Box component="main" sx={{ margin: "0 auto", maxWidth: "1200px", p: 2 }}>
      <FormRegister />
    </Box>
  );
};

export default Register;
