import { Box, Paper, Typography, Button } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import FormNegocio from "../components/FormNegocio/FormNegocio";
import useScrollUp from "../hooks/useScrollUp";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  addBusiness,
  deleteImage,
  findBusiness,
  updateBusiness,
} from "../api/business";
import { initialBusinessValues } from "./utils/initialValues";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../api/cloudinary";

const Negocio = () => {
  const { user, login } = useUserContext();
  const [negocioId, setNegocioId] = useState(null || user?.negocio?.id);
  const [logoData, setLogoData] = useState(null);
  const [businessValues, setBusinessValues] = useState(initialBusinessValues);
  const queryClient = useQueryClient();
  useScrollUp();

  useQuery({
    queryKey: ["Business"],
    queryFn: () => findBusiness(user.token),
    onSuccess: (data) => {
      setBusinessValues(data.data);
      login({
        ...user,
        negocio: {
          ...user.negocio,
          id: data.data.id,
          nombre: data.data.nombre,
          telefono: data.data.telefono,
          pais: data.data.pais,
          precioHora: data.data.precioHora,
          direccion: data.data.direccion,
          logo: data.data.logo,
        },
      });
    },
    onError: (error) =>
      enqueueSnackbar(error.message, {
        variant: "error",
      }),

    enabled: negocioId !== undefined,
  });

  const createBusinessMutation = useMutation({
    mutationFn: (values) => addBusiness(values, user.token),
    onSuccess: (data) => {
      setNegocioId(data.data);
      enqueueSnackbar("Negocio agregado correctamente", {
        variant: "success",
      });
    },
    onError: (error) => console.error(error.message),
  });

  const updateBusinessMutation = useMutation({
    mutationFn: (values) => updateBusiness(negocioId, values, user.token),
    onSuccess: () => {
      enqueueSnackbar("Negocio Actualizado correctamente", {
        variant: "success",
      });
    },
    onError: (error) =>
      enqueueSnackbar(error.message, {
        variant: "error",
      }),
  });

  const createImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: async (data) => {
      const updatedValues = {
        ...businessValues,
        logo: data.data.secure_url,
      };

      await updateBusinessMutation.mutateAsync(updatedValues);
      queryClient.invalidateQueries(["Business"]);
    },
  });

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", logoData);
      formData.append("upload_preset", "trgxzbtn");

      await createImageMutation.mutateAsync(formData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = () => {
    negocioId
      ? updateBusinessMutation.mutate(businessValues)
      : createBusinessMutation.mutate(businessValues);
  };

  const deleteImageMutation = useMutation({
    mutationFn: () => updateBusiness(negocioId, { logo: null }, user.token),
    onSuccess: () => {
      enqueueSnackbar("Logo eliminado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["Business"]);
    },
    onError: (error) => console.error(error.message),
  });

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
        businessValues={businessValues}
        setBusinessValues={setBusinessValues}
        logoData={logoData}
        setLogoData={setLogoData}
        deleteImageMutation={deleteImageMutation}
        handleImageUpload={handleImageUpload}
      />
    </>
  );
};

export default Negocio;
