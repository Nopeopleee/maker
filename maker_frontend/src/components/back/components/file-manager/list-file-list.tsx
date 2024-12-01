// React
import React from "react";

// MUI
import { Typography, MenuList, MenuItem, ListItemIcon } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Iconify
import { Icon } from "@iconify/react/dist/iconify.js";

// Interfaces
import { FileItem } from "./interface";

// lib
import Helper from "@/lib/helper";

interface ListFileListProps {
  files: FileItem[];
}

const ListFileList = ({ files }: ListFileListProps) => {
  return (
    <Grid size={{ xs: 12, sm: 12 }} p={2}>
      <MenuList>
        {files.map((file) => (
          <MenuItem key={file.id} onClick={() => console.log(file.id)}>
            <Grid
              width={"100%"}
              container
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid
                container
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid display={"flex"} alignItems={"center"}>
                  <ListItemIcon>
                    <Icon
                      icon={file.isDir ? "mdi:folder" : "mdi:file"}
                      fontSize={20}
                    />
                  </ListItemIcon>
                  <Typography variant="inherit">{file.name}</Typography>
                </Grid>
                <Typography variant="caption">
                  {Helper.fileSizes(file.size)}
                </Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Typography variant="caption">
                    {Helper.getFormattedDate(file.modDate, "LLL")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </MenuList>
    </Grid>
  );
};

export default ListFileList;
