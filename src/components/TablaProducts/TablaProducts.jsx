import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { enqueueSnackbar } from "notistack";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { columnsProducts } from "../TablaGenerica/utils/columnas";

export default function TablaProducts({
  rows,
  fetchComponentes,
  cargando,
  agregarAlCarrito,
}) {
  const [selectionModel, setSelectionModel] = useState(null);

  const { user } = useUserContext();
  const navigate = useNavigate();

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/products/edit/" + id[0]);
  }

  async function handleEliminar(id) {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este elemento?"
    );

    if (confirmacion) {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "componente/" + id,
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

        enqueueSnackbar("Elemento eliminado correctamente", {
          variant: "success",
        });
        fetchComponentes();
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1000px" }}>
      <TablaGenerica
        columns={columnsProducts}
        rows={rows}
        cargando={cargando}
        setSelectionModel={setSelectionModel}
      />
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
        <Button
          onClick={() => handleEliminar(selectionModel)}
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
        <Button
          onClick={() => agregarAlCarrito(selectionModel)}
          variant="contained"
          endIcon={<ShoppingCartCheckoutIcon />}
          color="warning"
        >
          Carrito
        </Button>
      </Stack>
    </Box>
  );
}
