// React
import React, { useState } from "react";

// MUI
import {
  Breadcrumbs,
  IconButton,
  Box,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Iconify
import { Icon } from "@iconify/react/dist/iconify.js";

// Components
import Toolbar from "./toolbar";
import GridFileList from "./grid-file-list";
import ListFileList from "./list-file-list";
import ContextMenu from "./context-menu";

// Interfaces
import type { ViewMode, ContextMenuType, FileManagerProps } from "./interface";

// Redux
import { useDispatch } from "@/redux/store";
import { fileSlice } from "@/redux/slices/back/fileSlice";

const FileManager = ({
  files,
  folderChain,
  actions,
  actionList,
  contextActions,
  selectedFiles,
  setSelectedFiles,
  handleDoubleClick,
  handleGoBack,
}: FileManagerProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>({ mode: "grid" });
  const [contextMenu, setContextMenu] = useState<ContextMenuType | null>(null);

  const handleSelect = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();
    if (event.ctrlKey) {
      if (selectedFiles.includes(name)) {
        setSelectedFiles(selectedFiles.filter((file) => file !== name));
      } else {
        setSelectedFiles([...selectedFiles, name]);
      }
    } else if (event.shiftKey) {
      const lastSelectedIndex = files.findIndex(
        (file) => file.name === selectedFiles[0]
      );
      const currentSelectedIndex = files.findIndex(
        (file) => file.name === name
      );
      const start = Math.min(lastSelectedIndex, currentSelectedIndex);
      const end = Math.max(lastSelectedIndex, currentSelectedIndex);
      setSelectedFiles(files.slice(start, end + 1).map((file) => file.name));
    } else {
      setSelectedFiles([name]);
    }
  };

  const handleClearSelection = () => {
    setSelectedFiles([]);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const fileElement = target.closest("[data-file-name]") as HTMLElement;
    if (fileElement) {
      const fileId = fileElement.getAttribute("data-file-name");
      if (fileId) {
        handleSelect(event, fileId);
      }
    }
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
        userSelect: "none",
      }}
      onClick={handleClearSelection}
      onContextMenu={handleContextMenu}
    >
      {/* Breadcrumb  */}
      <Grid size={{ xs: 12, sm: 12 }} display={"flex"} alignItems={"center"}>
        <IconButton
          size="small"
          sx={{ mr: 1 }}
          disabled={folderChain.length === 1}
          onClick={handleGoBack}
        >
          <Icon icon="bi:arrow-up" />
        </IconButton>
        <Breadcrumbs>
          {folderChain.map((folder, index) => (
            <Button key={index} disabled={folder.isRoot}>
              <Typography variant="button">{folder.name}</Typography>
            </Button>
          ))}
        </Breadcrumbs>
      </Grid>

      {/* Toolbar */}
      <Toolbar
        fileCount={files?.length}
        actions={actions}
        actionList={actionList}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* File List */}
      {viewMode.mode === "grid" ? (
        <Box onClick={(e) => e.stopPropagation()}>
          <GridFileList
            files={files}
            handleSelect={handleSelect}
            handleDoubleClick={handleDoubleClick}
            selectedFiles={selectedFiles}
          />
        </Box>
      ) : (
        <ListFileList files={files} />
      )}

      {/* Context Menu */}
      <ContextMenu
        contextActions={contextActions}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        selectedFiles={selectedFiles}
      />
    </Grid>
  );
};

export default FileManager;
