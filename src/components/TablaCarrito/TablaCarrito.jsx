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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { columnas, style } from "./utils/columnas";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function TablaCarrito({
  rowsCarrito,
  fetchProveedores,
  cargando,

  handleCellEditStop,
  handleDelete,
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
        <Button
          //   onClick={() => handleEliminar(selectionModel)}
          color="success"
          variant="contained"
          endIcon={<LocalShippingIcon />}
        >
          Solicitar
        </Button>
      </Stack>
    </Box>
  );
}
