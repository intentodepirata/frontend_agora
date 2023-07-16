import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
export default function MenuClickDerechoProductos({
  contextMenu,
  handleClose,
  eliminar,
  editar,
  carrito,
}) {
  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      slotProps={{
        root: {
          onContextMenu: (e) => {
            e.preventDefault();
            handleClose();
          },
        },
      }}
    >
      <MenuList sx={{ width: 220, maxWidth: "100%" }}>
        <MenuItem onClick={carrito}>
          <ListItemIcon>
            <ShoppingCartCheckoutIcon />
          </ListItemIcon>
          <ListItemText>Agregar al carrito</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={editar}>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={eliminar}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Eliminar</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
