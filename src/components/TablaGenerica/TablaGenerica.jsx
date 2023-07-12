import { DataGrid } from "@mui/x-data-grid";
import CustomGridToolbar from "../CutomGridToolbar/CutomGridToolbar";
import { LinearProgress } from "@mui/material";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { customLocaleText } from "../../traductions/customGridLocaleText";

export default function TablaGenerica({
  columns,
  rows,
  cargando,
  setSelectionModel,
}) {
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  return (
    <DataGrid
      sx={{
        "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          color: "grey",
        },
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
        },
        height: 720,
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
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
  );
}
