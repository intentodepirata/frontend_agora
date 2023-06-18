import {
  GridPagination,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

export default function CustomGridFooter() {
  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <GridToolbarExport />
      <GridPagination />
    </GridToolbarContainer>
  );
}
