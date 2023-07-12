import styled from "@emotion/styled";
import { MaterialDesignContent } from "notistack";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-success": {
      padding: "12px 14px 12px 14px",
      maxWidth: "400px",
    },
    "&.notistack-MuiContent-error": {
      padding: "12px 14px 12px 14px",
      maxWidth: "400px",
    },
    "&.notistack-MuiContent-info": {
      padding: "12px 14px 12px 14px",
    },
    "&.notistack-MuiContent-warning": {
      padding: "14px 14px 14px 14px",
    },
    "&.notistack-MuiContent-default": {
      padding: "12px 14px 12px 14px",
    },
  })
);
