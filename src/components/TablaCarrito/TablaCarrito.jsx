import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  AppBar,
  Tabs,
  List,
  ListItemText,
  Divider,
  ListItem,
  LinearProgress,
} from "@mui/material";

import { columnas, style } from "./utils/columnas";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Carrito from "../Carrito/Carrito";
import CustomNoRowsOverlay2 from "../CustomNoRowsOverlay2/CustomNoRowsOverlay2";

export default function TablaCarrito({
  rowsCarrito,
  cargando,
  handleCellEditStop,
  handleDelete,
  setRowsCarrito,
}) {
  const [selectionModel, setSelectionModel] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "400px",
        height: 740,
      }}
    >
      <DataGrid
        sx={{
          "& .css-mf4goe-MuiDataGrid-root": {
            fontWeight: 700,
            color: "grey",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          height: 720,
        }}
        rows={rowsCarrito}
        columns={columnas}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        onRowSelectionModelChange={handleSelectionModelChange}
        editMode="cell"
        onCellEditStop={handleCellEditStop}
        slots={{
          toolbar: CustomGridToolbar,
          loadingOverlay: LinearProgress,
          footer: CustomGridFooter,
          noRowsOverlay: CustomNoRowsOverlay2,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
      />
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
        <Button
          onClick={() => handleDelete(selectionModel)}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
        <Carrito
          rowsCarrito={rowsCarrito}
          user={user}
          setRowsCarrito={setRowsCarrito}
        />
      </Stack>
    </Box>
  );
}
