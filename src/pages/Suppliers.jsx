import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import useScrollUp from "../hooks/useScrollUp";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import { columnsProveedores } from "../components/TablaGenerica/utils/columnas";
import MenuClickDerechoGenerico from "../components/MenuClickDerechoGenerico/MenuClickDerechoGenerico";
export default function Suppliers() {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();
  useScrollUp();

  const fetchProveedores = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}proveedores/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();
      setCargando(false);
      setRows(data);
    } catch (error) {
      "Error al obtener los proveedores:", error;
    }
  };
  useEffect(() => {
    fetchProveedores();
  }, []);
  const handleDoubleClickModelChange = (row) => {
    navigate("/home/suppliers/edit/" + row.id);
  };

  function handleEditar(id) {
    navigate("/home/suppliers/edit/" + id[0]);
  }

  const handleDeleteProveedores = (id) => {
    handleClose();
    enqueueSnackbar("Desear eliminar al proveedor?", {
      variant: "success",
      persist: true,
      action: (snackbarId) => (
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ textTransform: "none" }}
            size="small"
            variant="contained"
            onClick={() => handleEliminar(id, snackbarId)}
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
  const handleClose = () => {
    setContextMenu(null);
  };
  async function handleEliminar([id]) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}proveedores/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el elemento");
      }

      enqueueSnackbar("Proveedor eliminado correctamente", {
        variant: "success",
      });
      fetchProveedores();
    } catch (error) {
      console.error(error.message);
    }
  }
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
          cargando={cargando}
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
          eliminar={() => handleDeleteProveedores([selectedRow])}
        />
        <Stack
          sx={{ my: 2, justifyContent: "end" }}
          direction="row"
          spacing={2}
        >
          <Button
            onClick={() => handleDeleteProveedores(selectionModel)}
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
