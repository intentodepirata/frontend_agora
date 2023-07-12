import { Box, Button, Stack, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { columnsChecklist } from "../TablaGenerica/utils/columnas";

export default function TablaChecklist({ cargando }) {
  const [selectionModel, setSelectionModel] = useState(null);
  const [servicioActualizado, setServicioActualizado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [rows, setRows] = useState([]);

  return (
    <Box sx={{ height: 740, width: "100%", maxWidth: "1400px" }}>
      <Stack sx={{ my: 2, justifyContent: "end" }} direction="row" spacing={2}>
        <TextField
          fullWidth
          id="checlist"
          label="Agrega nuevos test"
          value={nombre}
          size="small"
          onChange={(e) => setNombre(e.target.value)}
          mr={2}
        />

        <Button
          onClick={() => handleEliminar(selectionModel)}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{ minWidth: 120 }}
        >
          Eliminar
        </Button>
        <Button
          onClick={() => handleEditar(selectionModel)}
          variant="contained"
          startIcon={<EditNoteIcon />}
          sx={{ minWidth: 120 }}
        >
          Editar
        </Button>
        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          startIcon={<AddBoxIcon />}
          color="success"
          sx={{ minWidth: 140 }}
        >
          {servicioActualizado ? "Actualizar" : "Agregar"}
        </Button>
      </Stack>

      <TablaGenerica
        columns={columnsChecklist}
        rows={rows}
        cargando={cargando}
        setSelectionModel={setSelectionModel}
      />
    </Box>
  );
}
