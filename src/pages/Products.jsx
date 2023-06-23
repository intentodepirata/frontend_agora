import { Box, Paper, Typography, Button } from "@mui/material";
import TablaProducts from "../components/TablaProducts/TablaProducts";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import TablaCarrito from "../components/TablaCarrito/TablaCarrito";
import { enqueueSnackbar } from "notistack";

const Products = () => {
  const [rows, setRows] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [rowsCarrito, setRowsCarrito] = useState(
    JSON.parse(localStorage.getItem("carritoAgora")) || []
  );

  const { user } = useUserContext();

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
  };

  const handleCellEditStop = (params) => {
    // Puedes agregar lógica personalizada al finalizar la edición de celda aquí
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

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
        <Box>
          <Typography mb={2} textAlign={"center"} variant="h6" color="grey">
            Stock local
          </Typography>
          <TablaProducts
            rows={rows}
            fetchComponentes={fetchComponentes}
            cargando={cargando}
            agregarAlCarrito={agregarAlCarrito}
          />
        </Box>
        <Box>
          <Typography mb={2} textAlign={"center"} variant="h6" color="grey">
            Carrito
          </Typography>
          <TablaCarrito
            rowsCarrito={rowsCarrito}
            cargando={cargando}
            handleCellEditStop={handleCellEditStop}
            handleDelete={handleDelete}
            setRowsCarrito={setRowsCarrito}
          />
        </Box>
      </Box>
    </>
  );
};

export default Products;
