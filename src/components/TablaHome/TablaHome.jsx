import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./utils/columns";
import CustomGridFooter from "../CustomGridFooter/CustomGridFooter";
import { customLocaleText } from "../../traductions/customGridLocaleText";
import MenuClickDerechoMain from "../MenuClickDerechoMain/MenuClickDerechoMain";

export default function TablaHome({ rows, cargando, opcionesFiltro }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();

  const navigate = useNavigate();

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  const handleDoubleClickModelChange = (row) => {
    navigate("/home/orders/edit/" + row.id);
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
  }

  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
  }

  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }

  //Funciones para el menu del click derecho
  function entregar() {
    console.log("entregar", selectedRow);
  }
  function avisarWhatsApp() {
    console.log("avisarWhatsApp", selectedRow);
  }
  function avisarEmail() {
    console.log("avisarEmail", selectedRow);
  }
  function imprimir() {
    window.open(`/print/${selectedRow}`, "_blank");
    handleClose();
  }
  function editar() {
    navigate("/home/orders/edit/" + selectedRow);
    handleClose();
  }
  function eliminar() {
    console.log("eliminando", selectedRow);
  }
  return (
    <Box sx={{ width: "100%", maxWidth: "1400px" }}>
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
          height: 660,
          mb: 2,
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
          footer: CustomGridFooter,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: "context-menu" },
          },
        }}
        loading={Boolean(cargando)}
        localeText={customLocaleText}
        filterModel={opcionesFiltro ? opcionesFiltro : undefined}
      />
      <MenuClickDerechoMain
        contextMenu={contextMenu}
        handleClose={handleClose}
        entregar={entregar}
        avisarWhatsApp={avisarWhatsApp}
        avisarEmail={avisarEmail}
        imprimir={imprimir}
        editar={editar}
        eliminar={eliminar}
      />

      <Stack
        sx={{
          my: 2,
          justifyContent: "end",
        }}
        direction={{ xs: "column", md: "row" }}
        spacing={2}
      >
        <Button
          onClick={() => handleEliminar(selectionModel)}
          color="error"
          variant="contained"
          endIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
        <Button
          onClick={() => handleEditar(selectionModel)}
          variant="contained"
          endIcon={<EditNoteIcon />}
        >
          Editar
        </Button>
        <Button
          onClick={() => handlePrint(selectionModel)}
          variant="contained"
          endIcon={<PrintIcon />}
          color="success"
        >
          Imprimir
        </Button>
      </Stack>
    </Box>
  );
}
