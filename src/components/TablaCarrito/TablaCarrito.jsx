import { Box, LinearProgress } from "@mui/material";
import { columnas } from "./utils/columnas";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import CustomNoRowsOverlay2 from "../CustomNoRowsOverlay2/CustomNoRowsOverlay2";

export default function TablaCarrito({
  rowsCarrito,
  cargando,
  handleCellEditStop,
  setSelectionModel,
}) {
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  return (
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
  );
}
