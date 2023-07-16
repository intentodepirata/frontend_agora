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
import PrintIcon from "@mui/icons-material/Print";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
export default function MenuClickDerechoMain({
  contextMenu,
  handleClose,
  entregar,
  avisarWhatsApp,
  avisarEmail,
  imprimir,
  editar,
  eliminar,
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
        <MenuItem onClick={entregar}>
          <ListItemIcon>
            <DoneAllOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Entregar a cliente</ListItemText>
        </MenuItem>
        <MenuItem onClick={avisarWhatsApp}>
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          <ListItemText>Avisar por WhatsApp</ListItemText>
        </MenuItem>
        <MenuItem onClick={avisarEmail}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>Avisar por Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={imprimir}>
          <ListItemIcon>
            <PrintIcon />
          </ListItemIcon>
          <ListItemText>Imprimir</ListItemText>
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
