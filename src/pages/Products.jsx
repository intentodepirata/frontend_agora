import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import TablaCarrito from "../components/TablaCarrito/TablaCarrito";
import { enqueueSnackbar } from "notistack";
import useScrollUp from "../hooks/useScrollUp";
import { columnsProducts } from "../components/TablaGenerica/utils/columnas";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import TablaGenerica from "../components/TablaGenerica/TablaGenerica";
import Carrito from "../components/Carrito/Carrito";
import MenuClickDerechoProductos from "../components/MenuClickDerechoProductos/MenuClickDerechoProductos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../api/products";
import HandleConfirmNotification from "../ui/HandleConfirmNotification";

const Products = () => {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState(null);
  const [rowsCarrito, setRowsCarrito] = useState(
    JSON.parse(localStorage.getItem("carritoAgora")) || []
  );
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useScrollUp();

  useEffect(() => {
    localStorage.setItem("carritoAgora", JSON.stringify(rowsCarrito));
  }, [rowsCarrito]);

  const agregarAlCarrito = ([item]) => {
    // Verifica si el elemento ya está en el carrito
    const { id, modelo, nombre } = rows.find((row) => row.id == item);
    const newItem = {
      id,
      modelo,
      nombre,
      cantidad: 1,
    };

    const itemExistente = rowsCarrito.find((row) => row.id == newItem.id);

    if (itemExistente) {
      // Si el elemento ya existe, actualiza la cantidad
      const nuevaCantidad = itemExistente.cantidad + 1;
      const itemActualizado = {
        ...itemExistente,
        cantidad: nuevaCantidad,
      };

      setRowsCarrito(
        rowsCarrito.map((row) => (row.id === item ? itemActualizado : row))
      );
      enqueueSnackbar("Producto actualizado en el carrito", {
        variant: "info",
      });
    } else {
      // Si el elemento no existe, agrégalo al carrito
      setRowsCarrito([...rowsCarrito, newItem]);
      enqueueSnackbar("Producto agregado al carrito", {
        variant: "success",
      });
    }
    handleClose();
  };

  const handleCellEditStop = (params) => {
    const { id, field, value } = params;
    const updatedRows = rowsCarrito.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });

    setRowsCarrito(updatedRows);
  };
  const handleDeleteCarrito = ([id]) => {
    const carritoActualizado = rowsCarrito.filter((row) => row.id !== id);
    setRowsCarrito(carritoActualizado);
  };

  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(user.token),
    onSuccess: (data) => setRows(data.data),
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const handleDoubleClickModelChange = (row) => {
    navigate("/home/products/edit/" + row.id);
  };

  function handleEditar(id) {
    navigate("/home/products/edit/" + id[0]);
  }
  function editar() {
    navigate("/home/products/edit/" + selectedRow);
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id, user.token),
    onSuccess: () => {
      enqueueSnackbar("Producto eliminado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["products"]);
    },
  });
  const handleDelete = (id) => {
    handleClose();
    enqueueSnackbar("Desear eliminar el Producto?", {
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
          Inventario
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          component={Link}
          to="/home/products/create"
        >
          Agregar producto
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mx: "auto",
          gap: 4,
          maxWidth: "1400px",
        }}
      >
        <Box sx={{ minHeight: 740, width: "100%", maxWidth: "1000px" }}>
          <Typography mb={2} textAlign={"center"} variant="h6" color="grey">
            Stock local
          </Typography>
          <TablaGenerica
            columns={columnsProducts}
            rows={rows}
            cargando={query.isFetching}
            setSelectionModel={setSelectionModel}
            handleDoubleClickModelChange={handleDoubleClickModelChange}
            setSelectedRow={setSelectedRow}
            setContextMenu={setContextMenu}
            contextMenu={contextMenu}
          />
          <MenuClickDerechoProductos
            contextMenu={contextMenu}
            handleClose={handleClose}
            eliminar={() => handleDelete(selectedRow)}
            editar={editar}
            carrito={() => agregarAlCarrito([selectedRow])}
          />

          <Stack
            sx={{ my: 2, justifyContent: "end" }}
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
              onClick={() => agregarAlCarrito(selectionModel)}
              variant="contained"
              endIcon={<ShoppingCartCheckoutIcon />}
              color="warning"
            >
              Carrito
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "420px",
            minHeight: 740,
          }}
        >
          <Typography mb={2} textAlign={"center"} variant="h6" color="grey">
            Carrito
          </Typography>

          <TablaCarrito
            rowsCarrito={rowsCarrito}
            cargando={query.isFetching}
            handleCellEditStop={handleCellEditStop}
            setSelectionModel={setSelectionModel}
          />

          <Stack
            sx={{ my: 2, justifyContent: "end" }}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <Button
              onClick={() => handleDeleteCarrito(selectionModel)}
              color="error"
              variant="contained"
              endIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
            <Carrito
              rowsCarrito={rowsCarrito}
              user={user}
              setRowsCarrito={setRowsCarrito}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Products;
