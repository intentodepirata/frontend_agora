import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export default function CustomGridToolbar() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <GridToolbarQuickFilter
        placeholder="Buscar por cualquier campo de la tabla"
        sx={{ width: "100%", p: 2 }}
      />
    </GridToolbarContainer>
  );
}
