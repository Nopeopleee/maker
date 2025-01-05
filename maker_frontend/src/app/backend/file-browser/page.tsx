"use client";

import Box from "@mui/material/Box";
import FileManager from "@/components/back/pages/file-manager/file-manager";
import { Suspense } from "react";

const FileBrowser = () => {
  return (
    <Suspense>
      <Box>
        <FileManager />
      </Box>
    </Suspense>
  );
};

export default FileBrowser;
