// React
import React from "react";

// Next.js
import dynamic from "next/dynamic";
import Image from "next/image";

// MUI
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Dnd kit
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

// Components
import { Icon } from "@iconify/react/dist/iconify.js";

// Interfaces
import type {
  DraggableFileProps,
  DroppableFileProps,
  GridFileListProps,
} from "./interface";

const DraggableFile = ({
  file,
  handleSelect,
  selectedFiles,
  handleDoubleClick,
}: DraggableFileProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: file.id,
      data: file,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 2 : "auto",
    opacity: isDragging ? 0.5 : 1,
    bgcolor: "#f9f9f9",
  };

  const handleClick = (e: React.MouseEvent) => {
    handleSelect(e, file.name);
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => handleClick(e)}
      onDoubleClick={(e) => handleDoubleClick(e, file)}
      data-file-name={file.name}
      sx={{
        p: 2,
        bgcolor: selectedFiles.includes(file.name) ? "Lavender" : "transparent",
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {file.isDir ? (
          <Icon
            icon="material-symbols:folder"
            fontSize={120}
            style={{ pointerEvents: "none" }}
          />
        ) : file.thumbnail ? (
          <Image
            src={file.thumbnail || ""}
            alt={file.name}
            width={150}
            height={150}
            priority
            unoptimized
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Icon
            icon="mdi:file"
            fontSize={120}
            style={{ pointerEvents: "none" }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
        }}
      >
        <Typography variant="body2" noWrap textAlign={"center"} width={120}>
          {file.name}
        </Typography>
      </Box>
    </Grid>
  );
};

const DroppableFile = ({
  file,
  handleSelect,
  selectedFiles,
  handleDoubleClick,
}: DroppableFileProps) => {
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: file.id,
    data: file,
  });

  return (
    <Grid
      ref={setDroppableNodeRef}
      sx={{
        border: isOver ? "1px dotted #ccc" : "none",
        backgroundColor: isOver ? "#f0f0f0" : "transparent",
      }}
    >
      <DraggableFile
        file={file}
        handleSelect={handleSelect}
        selectedFiles={selectedFiles}
        handleDoubleClick={handleDoubleClick}
      />
    </Grid>
  );
};

const GridFileList = ({
  files,
  handleSelect,
  selectedFiles,
  handleDoubleClick,
}: GridFileListProps) => {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: "grid-file-list",
    data: files,
  });

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id == over.id) return;

    if (selectedFiles.length === 0) {
      console.log(
        `Moved ${active.data?.current?.name} into ${over.data?.current?.name}`
      );
    } else {
      console.log(
        `Moved ${selectedFiles.map((file) => file)} into ${
          over.data?.current?.name
        }`
      );
    }
  };

  const sensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  return (
    <Grid container spacing={2} p={2} ref={setDroppableNodeRef}>
      <DndContext
        onDragEnd={onDragEnd}
        sensors={[sensor]}
        modifiers={[snapCenterToCursor]}
      >
        {files?.map((file) => (
          <DroppableFile
            key={file.id}
            file={file}
            handleSelect={handleSelect}
            selectedFiles={selectedFiles}
            handleDoubleClick={handleDoubleClick}
          />
        ))}
      </DndContext>
    </Grid>
  );
};

export default dynamic(() => Promise.resolve(GridFileList), { ssr: false });
