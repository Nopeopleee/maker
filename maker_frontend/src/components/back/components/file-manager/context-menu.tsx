// React
import React from "react";

// MUI
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";

// Iconify
import { Icon } from "@iconify/react/dist/iconify.js";

// Interfaces
import type { ContextMenuProps } from "./interface";

const ContextMenu = ({
  contextActions,
  contextMenu,
  setContextMenu,
  selectedFiles,
}: ContextMenuProps) => {
  const handleClose = () => {
    setContextMenu(null);
  };

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
    >
      {contextActions.map((action) => (
        <MenuItem
          key={action.id}
          disabled={action.hasSelected && !selectedFiles.length}
          onClick={() => {
            action.action();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Icon icon={action.icon} fontSize={20} />
          </ListItemIcon>
          <Typography variant="button">{action.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ContextMenu;
