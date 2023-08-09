export const customButton = (activo) => {
  return {
    m: 1,
    p: 4,
    border: activo ? "1px solid #0150F5" : "1px solid transparent",
    width: "100%",
    maxWidth: "300px",
    textTransform: "none",
    fontSize: "1.25rem",
    color: activo ? "#0150F5" : "inherit",
    transform: activo ? "scale(1.05)" : "scale(1)",
    display: "flex",
    placeContent: "center space-evenly",
    alignItems: "center",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.05)",
      color: "primary",
    },
  };
};
