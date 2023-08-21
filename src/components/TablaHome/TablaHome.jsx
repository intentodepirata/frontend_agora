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
import { enqueueSnackbar } from "notistack";
import {
  notificarPorEmail,
  notificarPorWhatsApp,
} from "../BotonNotificar/utils/generarMensaje";
import { useUserContext } from "../../contexts/UserContext";
import { findOrderToPrint } from "../../api/orders";
import HandleConfirmNotification from "../../ui/HandleConfirmNotification";
import { dataGridStyles } from "./style/dataGridStyles";

export default function TablaHome({
  rows,
  cargando,
  opcionesFiltro,
  deliverMutation,
  deleteMutation,
}) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(event.currentTarget.getAttribute("data-id"));
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
    const cliente = await findOrderToPrint(selectedRow, user.token);
    notificarPorWhatsApp(cliente.data, user);
    handleClose();
  }
  async function avisarEmail() {
    const cliente = await findOrderToPrint(selectedRow, user.token);
    notificarPorEmail(cliente.data, user);
    handleClose();
  }

  const handleDeliver = (id) => {
    handleClose();
    enqueueSnackbar("Desear entregar el terminal al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deliverMutation}
        />
      ),
    });
  };
  const handleDelete = (id) => {
    handleClose();
    enqueueSnackbar("Desear Eliminar la Orden?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deleteMutation}
        />
      ),
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px" }}>
      <DataGrid
        sx={dataGridStyles}
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
        entregar={() => handleDeliver(selectedRow)}
        avisarWhatsApp={avisarWhatsApp}
        avisarEmail={avisarEmail}
        imprimir={() => handlePrint(selectedRow)}
        editar={() => handleEditar([selectedRow])}
        eliminar={() => handleDelete(selectedRow)}
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
          onClick={() => handleDelete(selectionModel)}
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
