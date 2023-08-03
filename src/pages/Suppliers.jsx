import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsProveedores } from "../components/TablaGenerica/utils/columnas";
import MenuClickDerechoGenerico from "../components/MenuClickDerechoGenerico/MenuClickDerechoGenerico";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier, getSuppliers } from "../api/suppliers";

export default function Suppliers() {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  const handleDoubleClickModelChange = (row) => {
    navigate("/home/suppliers/edit/" + row.id);
  };

  function handleEditar(id) {
    navigate("/home/suppliers/edit/" + id[0]);
  }
  const handleClose = () => {
    setContextMenu(null);
  };

  const query = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers(user.token),

    onSuccess: (data) => setRows(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSupplier(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Proveedor eliminado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["suppliers"]);
    },
  });
  const handleDelete = (id) => {
    handleClose();
    enqueueSnackbar("Desear eliminar al Proveedor?", {
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
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial" sx={{ p: 2 }}>
          Proveedores
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/suppliers/create"
        >
          Agregar proveedor
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de proveedores
      </Typography>
      <Box
        sx={{
          p: 2,
          height: 740,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <TablaGenerica
          columns={columnsProveedores}
          rows={rows}
          cargando={query.isFetching}
          setSelectionModel={setSelectionModel}
          handleDoubleClickModelChange={handleDoubleClickModelChange}
          setSelectedRow={setSelectedRow}
          setContextMenu={setContextMenu}
          contextMenu={contextMenu}
        />
        <MenuClickDerechoGenerico
          contextMenu={contextMenu}
          handleClose={handleClose}
          editar={() => handleEditar([selectedRow])}
          eliminar={() => handleDelete([selectedRow])}
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <Button
            onClick={() => handleDelete(selectionModel)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
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
        </Stack>
      </Box>
    </>
  );
}
