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
  handleDoubleClickModelChange,
  setSelectedRow,
  setContextMenu,
  contextMenu,
}) {
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  const handleContextMenu = (event) => {
    event.preventDefault();

    setSelectedRow(event.currentTarget.getAttribute("data-id"));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  return (
    <>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F3F4F6",
          },
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
        onCellDoubleClick={handleDoubleClickModelChange}
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
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: "context-menu" },
          },
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
      />
    </>
  );
}
