import { LinearProgress } from "@mui/material";

const SnackbarProgress = ({ progress }) => {
  return <LinearProgress variant="determinate" value={progress} />;
};

export default SnackbarProgress;
