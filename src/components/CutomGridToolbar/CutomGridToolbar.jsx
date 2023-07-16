import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export default function CustomGridToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#F3F4F6",
      }}
    >
      <GridToolbarQuickFilter
        placeholder="Buscar por cualquier campo de la tabla"
        sx={{ width: "100%", p: "8px  8px 0 8px" }}
      />
    </GridToolbarContainer>
  );
}
