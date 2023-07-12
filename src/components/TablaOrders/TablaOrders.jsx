import { Box, Button, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { columnsOrders } from "../TablaGenerica/utils/columnas";

export default function TablaOrders({ rows, cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const navigate = useNavigate();

  function handlePrint(id) {
    window.open(`/print/${id}`, "_blank");
  }
  function handleEditar(id) {
    navigate("/home/orders/edit/" + id[0]);
  }
  function handleEliminar(id) {
    console.log("eliminando", id[0]);
  }

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <TablaGenerica
        columns={columnsOrders}
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
