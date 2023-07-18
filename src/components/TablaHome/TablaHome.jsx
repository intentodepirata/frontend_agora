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
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
  notificarPorEmail,
  notificarPorWhatsApp,
} from "../BotonNotificar/utils/generarMensaje";
import { useUserContext } from "../../contexts/UserContext";

export default function TablaHome({
  rows,
  cargando,
  opcionesFiltro,
  fetchEntregar,
  fetchCliente,
}) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
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
    handleClose();
    window.open(`/print/${id}`, "_blank");
  }

  function handleEditar(id) {
    handleClose();
    navigate("/home/orders/edit/" + id[0]);
  }

  //Funciones para el menu del click derecho
  async function avisarWhatsApp() {
    const cliente = await fetchCliente(selectedRow);
    notificarPorWhatsApp(cliente, user);
    handleClose();
  }
  async function avisarEmail() {
    const cliente = await fetchCliente(selectedRow);
    notificarPorEmail(cliente, user);
    handleClose();
  }

  const handleEntregar = (id) => {
    handleClose();
    enqueueSnackbar("Desear entregar el terminal al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => fetchEntregar(id, snackbarId)}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    });
  };
  async function handleEliminarOts([id]) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}ots/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el elemento");
      }

      enqueueSnackbar("Proveedor eliminado correctamente", {
        variant: "success",
      });
      // fetchOts();
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleDeleteOts = (id) => {
    handleClose();
    enqueueSnackbar("Desear eliminar la OT?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => handleEliminarOts(id, snackbarId)}
            color="primary"
          >
            Confirmar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="error"
            size="small"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    });
  };
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
        entregar={() => handleEntregar(selectedRow)}
        avisarWhatsApp={avisarWhatsApp}
        avisarEmail={avisarEmail}
        imprimir={() => handlePrint([selectedRow])}
        editar={() => handleEditar([selectedRow])}
        eliminar={() => handleDeleteOts([selectedRow])}
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
          onClick={() => handleDeleteOts(selectionModel)}
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
