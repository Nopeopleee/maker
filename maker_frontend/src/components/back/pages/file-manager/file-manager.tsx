// types.ts
interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  modifiedDate: Date;
  path: string;
  content?: string; // For preview purposes
  mimeType?: string;
}

interface ViewMode {
  mode: "grid" | "list";
}

interface ContextMenu {
  mouseX: number;
  mouseY: number;
  file: FileItem | null;
}

// React
import React, { useEffect, useState } from "react";

// Mui
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Tooltip,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  CreateNewFolder as CreateNewFolderIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  NavigateNext as NavigateNextIcon,
  ContentCopy as CopyIcon,
  ContentCut as CutIcon,
  ContentPaste as PasteIcon,
  Edit as EditIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import { alertSlice } from "@/redux/slices/back/alertSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const FileManager: React.FC = () => {
  const dispatch = useDispatch();

  // Redux Actions
  const { setOpen, setMessage, setSeverity } = alertSlice.actions;

  const [viewMode, setViewMode] = useState<ViewMode>({ mode: "grid" });
  const [currentPath, setCurrentPath] = useState<string[]>(["root"]);
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Documents",
      type: "folder",
      modifiedDate: new Date(),
      path: "/root/Documents",
    },
    {
      id: "2",
      name: "image.jpg",
      type: "file",
      size: 1024,
      modifiedDate: new Date(),
      path: "/root/image.jpg",
      mimeType: "image/jpeg",
      content: "/api/placeholder/400/300",
    },
    {
      id: "3",
      name: "document.txt",
      type: "file",
      size: 512,
      modifiedDate: new Date(),
      path: "/root/document.txt",
      mimeType: "text/plain",
      content: "This is a sample text file content.",
    },
  ]);
  const [draggedItem, setDraggedItem] = useState<FileItem | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const [previewDialog, setPreviewDialog] = useState<{
    open: boolean;
    file: FileItem | null;
  }>({
    open: false,
    file: null,
  });
  const [clipboard, setClipboard] = useState<{
    action: "copy" | "cut" | null;
    file: FileItem | null;
  }>({
    action: null,
    file: null,
  });

  useEffect(() => {
    // Filter files based on current path
    const currentPathStr = "/" + currentPath.join("/");
    const currentFiles = files.filter((file) => {
      const parentPath = file.path.substring(0, file.path.lastIndexOf("/"));
      return parentPath === currentPathStr;
    });
  }, [currentPath, files]);

  const handleContextMenu = (event: React.MouseEvent, file: FileItem) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      file,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleFolderClick = (folder: FileItem) => {
    const newPath = folder.path.split("/").filter((p) => p);
    setCurrentPath(newPath);
  };

  const handlePreview = (file: FileItem) => {
    setPreviewDialog({ open: true, file });
    handleCloseContextMenu();
  };

  const handleClosePreview = () => {
    setPreviewDialog({ open: false, file: null });
  };

  const handleDragStart = (file: FileItem, event: React.DragEvent) => {
    event.dataTransfer.setData("text/plain", file.id);
    setDraggedItem(file);
  };

  const handleDragOver = (e: React.DragEvent, targetFolder?: FileItem) => {
    e.preventDefault();
    if (targetFolder?.type === "folder") {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#f5f5f5";
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = "";
  };

  const handleDrop = (e: React.DragEvent, targetFolder?: FileItem) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).style.backgroundColor = "";

    if (!draggedItem || !targetFolder || targetFolder.type !== "folder") return;

    const newFiles = files.map((file) => {
      if (file.id === draggedItem.id) {
        return {
          ...file,
          path: `${targetFolder.path}/${file.name}`,
        };
      }
      return file;
    });

    setFiles(newFiles);
    dispatch(setOpen(true));
    dispatch(setMessage("File moved successfully"));
    dispatch(setSeverity("success"));
  };

  const handleCreateFolder = () => {
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: "New Folder",
      type: "folder",
      modifiedDate: new Date(),
      path: `${currentPath.join("/")}/New Folder`,
    };
    setFiles([...files, newFolder]);
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId));
    dispatch(setOpen(true));
    dispatch(setMessage("File deleted successfully"));
    dispatch(setSeverity("success"));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file) => ({
      id: Date.now().toString(),
      name: file.name,
      type: "file",
      size: file.size,
      modifiedDate: new Date(),
      path: `${currentPath.join("/")}/${file.name}`,
    }));

    setFiles([...files, ...newFiles]);
    dispatch(setOpen(true));
    dispatch(setMessage("File uploaded successfully"));
    dispatch(setSeverity("success"));
  };

  const navigateTo = (index: number) => {
    setCurrentPath((prev) => prev.slice(0, index + 1));
  };

  const handleCopy = (file: FileItem) => {
    setClipboard({ action: "copy", file });
    handleCloseContextMenu();
  };

  const handleCut = (file: FileItem) => {
    setClipboard({ action: "cut", file });
    handleCloseContextMenu();
  };

  const handlePaste = () => {
    if (!clipboard.file) return;

    const newPath = `/${currentPath.join("/")}/${clipboard.file.name}`;

    // Check if file exists in current directory
    if (files.some((f) => f.path === newPath)) {
      dispatch(setOpen(true));
      dispatch(setMessage("File already exists in this directory"));
      dispatch(setSeverity("warning"));
      return;
    }

    if (clipboard.action === "copy") {
      const newFile: FileItem = {
        ...clipboard.file,
        id: Date.now().toString(),
        path: newPath,
      };
      setFiles([...files, newFile]);
    } else if (clipboard.action === "cut") {
      setFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.id === clipboard.file?.id) {
            return { ...file, path: newPath };
          }
          return file;
        })
      );
    }

    setClipboard({ action: null, file: null });
    handleCloseContextMenu();
  };

  const renderPreview = (file: FileItem) => {
    if (!file.mimeType) return null;

    if (file.mimeType.startsWith("image/")) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <img
            src={file.content}
            alt={file.name}
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </Box>
      );
    }

    if (file.mimeType === "text/plain") {
      return <Box sx={{ p: 2, whiteSpace: "pre-wrap" }}>{file.content}</Box>;
    }

    return (
      <Box sx={{ p: 2 }}>
        <Typography>Preview not available for this file type.</Typography>
      </Box>
    );
  };

  const renderContextMenu = () => (
    <Menu
      open={contextMenu !== null}
      onClose={handleCloseContextMenu}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      {contextMenu?.file?.type === "file" && (
        <MenuItem onClick={() => handlePreview(contextMenu.file!)}>
          <ListItemIcon>
            <PreviewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Preview</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={() => handleCopy(contextMenu?.file!)}>
        <ListItemIcon>
          <CopyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleCut(contextMenu?.file!)}>
        <ListItemIcon>
          <CutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cut</ListItemText>
      </MenuItem>
      {clipboard.file && (
        <MenuItem onClick={handlePaste}>
          <ListItemIcon>
            <PasteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={() => handleDelete(contextMenu?.file?.id!)}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );

  const renderGridView = () => (
    <Grid container spacing={2}>
      {files.map((file) => (
        <Grid size={{ xs: 12, md: 2 }} key={file.id}>
          <Card
            draggable
            onDragStart={(e) => handleDragStart(file, e)}
            onDragOver={(e) => handleDragOver(e, file)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, file)}
            onClick={() => file.type === "folder" && handleFolderClick(file)}
            onContextMenu={(e) => handleContextMenu(e, file)}
            sx={{
              cursor: file.type === "folder" ? "pointer" : "default",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                {file.type === "folder" ? (
                  <FolderIcon sx={{ fontSize: 48, color: "primary.main" }} />
                ) : (
                  <FileIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                )}
                <Typography variant="body1" noWrap>
                  {file.name}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              {file.type === "file" && (
                <Tooltip title="Preview">
                  <IconButton size="small" onClick={() => handlePreview(file)}>
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = () => (
    <List>
      {files.map((file) => (
        <ListItem
          key={file.id}
          draggable
          onDragStart={(e) => handleDragStart(file, e)}
          onDragOver={(e) => handleDragOver(e, file)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, file)}
          onClick={() => file.type === "folder" && handleFolderClick(file)}
          onContextMenu={(e) => handleContextMenu(e, file)}
          sx={{
            cursor: file.type === "folder" ? "pointer" : "default",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <ListItemIcon>
            {file.type === "folder" ? (
              <FolderIcon color="primary" />
            ) : (
              <FileIcon color="action" />
            )}
          </ListItemIcon>
          <ListItemText
            primary={file.name}
            secondary={new Date(file.modifiedDate).toLocaleDateString()}
          />
          <List>
            <ListItem>
              {file.type === "file" && (
                <>
                  <Tooltip title="Download">
                    <IconButton edge="end" sx={{ mr: 1 }}>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Preview">
                    <IconButton
                      edge="end"
                      sx={{ mr: 1 }}
                      onClick={() => handlePreview(file)}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(file.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Grid container justifyContent="center">
      <Grid size={{ xs: 12, md: 12 }}>
        <Paper sx={{ p: 2 }}>
          {/* Breadcrumb */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            {currentPath.map((path, index) => (
              <Link
                key={path}
                component="button"
                variant="body1"
                onClick={() => navigateTo(index)}
                color="inherit"
                underline="hover"
              >
                {path}
              </Link>
            ))}
          </Breadcrumbs>

          {/* Toolbar */}
          <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
            <Tooltip
              title={viewMode.mode === "grid" ? "List View" : "Grid View"}
            >
              <IconButton
                onClick={() =>
                  setViewMode({
                    mode: viewMode.mode === "grid" ? "list" : "grid",
                  })
                }
              >
                {viewMode.mode === "grid" ? <ViewListIcon /> : <GridViewIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Folder">
              <IconButton onClick={handleCreateFolder}>
                <CreateNewFolderIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Upload Files">
              <IconButton component="label">
                <UploadIcon />
                <VisuallyHiddenInput
                  type="file"
                  multiple
                  onChange={handleUpload}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Files Display */}
          {viewMode.mode === "grid" ? renderGridView() : renderListView()}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FileManager;
