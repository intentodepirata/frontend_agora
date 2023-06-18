import { Box, Button, LinearProgress, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function TablaGastos({ rows, fetchProveedores, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  return (
    <Box sx={{ height: 340, width: "100%", maxWidth: "1400px" }}>
      <DataGrid
        sx={{
          "& .css-mf4goe-MuiDataGrid-root": {
            fontWeight: 700,
            color: "grey",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          height: 320,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={handleSelectionModelChange}
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
    </Box>
  );
}
