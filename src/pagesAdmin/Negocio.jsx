import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormNegocio from "../components/FormNegocio/FormNegocio";
import useScrollUp from "../hooks/useScrollUp";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

const Negocio = () => {
  const [negocioId, setNegocioId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [precio, setPrecio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const { user, login } = useUserContext();
  useScrollUp();
  async function getNegocio() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}negocios/user/${user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    // console.log(data);
    if (!response.ok) {
      enqueueSnackbar(data.error, { variant: "error" });
      throw new Error(data.error);
    }
    setNombre(data.nombre);
    setTelefono(data.telefono);
    setPais(data.pais);
    setPrecio(data.precioHora);
    setDireccion(data.direccion);
    setNegocioId(data.id);
    setLogoUrl(data.logo);
    login({
      ...user,
      negocio: {
        ...user.negocio,
        id: data.id,
        nombre: data.nombre,
        telefono: data.telefono,
        pais: data.pais,
        precioHora: data.precioHora,
        direccion: data.direccion,
        logo: data.logo,
      },
    });
  }

  useEffect(() => {
    if (!negocioId) {
      getNegocio();
    }
  }, [user]);

  async function subirImagen() {
    try {
      const formData = new FormData();
      formData.append("file", logo);
      formData.append("upload_preset", "trgxzbtn");
      const url = import.meta.env.VITE_CLOUDINARY_URL;

      const responseCloudinary = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!responseCloudinary.ok) {
        throw new Error("Error al subir la imagen a Cloudinary");
      }

      const cloudinaryData = await responseCloudinary.json();
      const imageUrl = cloudinaryData.secure_url;

      const urlLocal = `${
        import.meta.env.VITE_API_URL
      }negocios/image/${negocioId}`;

      const response = await fetch(urlLocal, {
        method: "PUT",
        body: JSON.stringify({ logoUrl: imageUrl }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        enqueueSnackbar(data.error, { variant: "error" });
        throw new Error(data.error);
      }
      enqueueSnackbar("Imagen subida correctamente", {
        variant: "success",
      });
      getNegocio();

      // Aquí puedes realizar acciones adicionales con la URL de la imagen en Cloudinary
      console.log("URL de la imagen en Cloudinary:", imageUrl);

      // La imagen se ha subido exitosamente a Cloudinary
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  }
  const postNegocio = async () => {
    const negocio = {
      nombre,
      telefono,
      pais,
      precio,
      direccion,
    };
    const url = negocioId
      ? `${import.meta.env.VITE_API_URL}negocios/${negocioId}`
      : `${import.meta.env.VITE_API_URL}negocios/${user.id}`;

    const response = await fetch(url, {
      method: negocioId ? "PUT" : "POST",
      body: JSON.stringify(negocio),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      enqueueSnackbar(data.error, { variant: "error" });
      throw new Error(data.error);
    }
    enqueueSnackbar("Datos actualizados correctamente", { variant: "success" });
    getNegocio();
  };

  const handleSubmit = () => {
    postNegocio();
  };
  async function borrarImagen() {
    try {
      const url = `${import.meta.env.VITE_API_URL}negocios/image/${negocioId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        enqueueSnackbar(data.error, { variant: "error" });
        throw new Error(data.error);
      }
      getNegocio();

      // La URL de la imagen ha sido borrada exitosamente
      enqueueSnackbar("La imagen ha sido borrada ", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error al borrar la URL de la imagen:", error);
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
          my: 2,
        }}
      >
        <Typography component="h1" variant="h6" color="initial">
          Mi negocio
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px" }}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Box>
      <FormNegocio
        nombre={nombre}
        setNombre={setNombre}
        telefono={telefono}
        setTelefono={setTelefono}
        pais={pais}
        setPais={setPais}
        precio={precio}
        setPrecio={setPrecio}
        direccion={direccion}
        setDireccion={setDireccion}
        postNegocio={postNegocio}
        logo={logo}
        setLogo={setLogo}
        subirImagen={subirImagen}
        logoUrl={logoUrl}
        borrarImagen={borrarImagen}
      />
    </>
  );
};

export default Negocio;
