import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const SearchImei = ({}) => {
  const [imeiSearch, setImeiSearch] = useState("");
  return (
    <Paper
      elevation={4}
      sx={{ p: 2, maxWidth: "400px", display: "flex", alignItems: "center" }}
    >
      <Typography
        variant="body1"
        color="grey"
        fontWeight={"bold"}
        sx={{ mr: 2 }}
      >
        Buscar IMEI
      </Typography>
      <TextField
        size="small"
        id="searchImei"
        label="Imei del terminal"
        value={imeiSearch}
        onChange={(e) => setImeiSearch(e.target.value)}
      />
    </Paper>
  );
};

export default SearchImei;
