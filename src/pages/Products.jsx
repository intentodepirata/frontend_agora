import { Box, Typography, Button, Stack, Grid } from "@mui/material";
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

const Products = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [selectionModel, setSelectionModel] = useState(null);
  const [rowsCarrito, setRowsCarrito] = useState(
    JSON.parse(localStorage.getItem("carritoAgora")) || []
  );
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedRow, setSelectedRow] = useState();
  useScrollUp();
  const { user } = useUserContext();
  const navigate = useNavigate();
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
      const actualizado = {
        ...itemExistente,
        cantidad: nuevaCantidad,
      };

      setRowsCarrito(
        rowsCarrito.map((row) => (row.id === item ? actualizado : row))
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
  const handleDelete = ([id]) => {
    const actualizado = rowsCarrito.filter((row) => row.id !== id);
    setRowsCarrito(actualizado);
  };

  const fetchComponentes = async () => {
    try {
      setCargando(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}componente/`,
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
      console.error("Error al obtener las ots:", error);
    }
  };

  useEffect(() => {
    fetchComponentes();
  }, []);

  const handleDoubleClickModelChange = (row) => {
    navigate("/home/products/edit/" + row.id);
  };

  function handleEditar(id) {
    console.log("editando", id[0]);
    navigate("/home/products/edit/" + id[0]);
  }
  function editar() {
    console.log("editando", selectedRow);
    navigate("/home/products/edit/" + selectedRow);
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  async function handleEliminar(id) {
    handleClose();
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
            cargando={cargando}
            setSelectionModel={setSelectionModel}
            handleDoubleClickModelChange={handleDoubleClickModelChange}
            setSelectedRow={setSelectedRow}
            setContextMenu={setContextMenu}
            contextMenu={contextMenu}
          />
          <MenuClickDerechoProductos
            contextMenu={contextMenu}
            handleClose={handleClose}
            eliminar={() => handleEliminar(selectedRow)}
            editar={editar}
            carrito={() => agregarAlCarrito([selectedRow])}
          />

          <Stack
            sx={{ my: 2, justifyContent: "end" }}
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
            cargando={cargando}
            handleCellEditStop={handleCellEditStop}
            setSelectionModel={setSelectionModel}
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
