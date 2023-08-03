import { Box, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useScrollUp from "../hooks/useScrollUp";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsClientes } from "../components/TablaGenerica/utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuClickDerechoGenerico from "../components/MenuClickDerechoGenerico/MenuClickDerechoGenerico";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, getCustomers } from "../api/clientes";
const Clientes = () => {
  const [selectionModel, setSelectionModel] = useState(null);
  const [rows, setRows] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  const handleClose = () => {
    setContextMenu(null);
  };
  const handleDoubleClickModelChange = (row) => {
    navigate("/home/clientes/edit/" + row.id);
  };

  function handleEditar(id) {
    navigate("/home/clientes/edit/" + id[0]);
    handleClose();
  }

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(user.token),

    onSuccess: (data) => setRows(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (customerId) => deleteCustomer(customerId, user.token),
    onSuccess: () => {
      enqueueSnackbar("Cliente eliminado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["customers"]);
    },
  });

  const handleDeleteClientes = (id) => {
    handleClose();
    enqueueSnackbar("Desear eliminar al Cliente?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <HandleConfirmNotification
          id={id}
          snackbarId={snackbarId}
          fetch={deleteCustomerMutation}
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
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/clientes/create"
        >
          Crear cliente
        </Button>
      </Box>
      <Typography textAlign={"center"} variant="h6" color="grey">
        Listado de clientes
      </Typography>
      <Box
        sx={{
          p: 2,
          height: 740,
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <TablaGenerica
          columns={columnsClientes}
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
          eliminar={() => handleDeleteClientes([selectedRow])}
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <Button
            onClick={() => handleDeleteClientes(selectionModel)}
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
};

export default Clientes;
