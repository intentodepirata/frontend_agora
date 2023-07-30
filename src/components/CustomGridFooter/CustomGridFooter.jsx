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
      <GridToolbarExport
        csvOptions={{
          fileName: "customerDataBase",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
      <GridPagination />
    </GridToolbarContainer>
  );
}
