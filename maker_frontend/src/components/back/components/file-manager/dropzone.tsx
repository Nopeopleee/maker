// React
import React, { useEffect, useMemo } from "react";

// MUI
import { Box, Button, List, ListItem, Typography } from "@mui/material";

// Dropzone
import { useDropzone } from "react-dropzone";

// lib
import Helper from "@/lib/helper";

const baseStyle = {
  border: "1px dashed",
  borderColor: "#e0e0e0",
  borderRadius: 1,
  padding: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: 500,
};

const dragAcceptStyle = {
  borderColor: "#00e676",
};

interface DropzoneProps {
  uploadFiles: (files: File[]) => void;
}

const Dropzone = (props: DropzoneProps) => {
  const { uploadFiles } = props;

  const { acceptedFiles, isDragAccept, getRootProps, getInputProps } =
    useDropzone();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? dragAcceptStyle : {}),
    }),
    [isDragAccept]
  );

  const renderFileList = acceptedFiles.map((file: File) => (
    <ListItem key={file.name}>
      <Typography variant="body2" noWrap textOverflow={"ellipsis"} width={400}>
        {file.name} - {Helper.fileSizes(file.size)}
      </Typography>
    </ListItem>
  ));

  return (
    <Box>
      <Box {...getRootProps()} sx={style}>
        <input {...getInputProps()} />
        {!renderFileList.length ? (
          <Typography variant="body1">拖曳檔案至此或點擊上傳</Typography>
        ) : (
          <List>{renderFileList}</List>
        )}
      </Box>
      <Box
        sx={{ mt: 2 }}
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography variant="body2" noWrap>
          {acceptedFiles.length} 個檔案
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => uploadFiles(acceptedFiles as File[])}
          disabled={!acceptedFiles.length}
        >
          上傳
        </Button>
      </Box>
    </Box>
  );
};

export default Dropzone;
