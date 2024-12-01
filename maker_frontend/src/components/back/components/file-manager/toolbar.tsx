import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Icon from "@/components/common/Icon";
import {
  TextField,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { ViewMode, ActionItem, ActionListItem } from "./interface";

interface ToolbarProps {
  fileCount: number;
  actions: ActionItem[];
  actionList: ActionListItem[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Toolbar = ({
  fileCount,
  actions,
  actionList,
  viewMode,
  setViewMode,
}: ToolbarProps) => {
  const [anchorActionList, setAnchorActionList] = useState<null | HTMLElement>(
    null
  );
  const [anchorOptionList, setAnchorOptionList] = useState<null | HTMLElement>(
    null
  );
  const openActionMenu = Boolean(anchorActionList);
  const openOptionMenu = Boolean(anchorOptionList);

  return (
    <Grid
      size={{ xs: 12, sm: 12 }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Grid display={"flex"} alignItems={"center"}>
        <TextField size="small" label="Search" variant="outlined" />
        <Typography variant="body1" sx={{ ml: 2 }}>
          {fileCount} 個檔案
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        {actions.map((action) => (
          <Grid key={action.id}>
            <Tooltip title={action.tooltip} color="inherit">
              <Button size="small" onClick={action.action}>
                <Icon
                  icon={action.icon}
                  fontSize={20}
                  style={{ marginRight: 4 }}
                />
                <Typography variant="button">{action.label}</Typography>
              </Button>
            </Tooltip>
          </Grid>
        ))}
        <Grid display={actionList.length === 0 ? "none" : "block"}>
          <Tooltip title="操作" color="inherit">
            <Button
              size="small"
              onClick={(e) => setAnchorActionList(e.currentTarget)}
            >
              <Typography variant="button">操作</Typography>
              <Icon
                icon="mdi:chevron-down"
                fontSize={20}
                style={{ marginLeft: 4 }}
              />
            </Button>
          </Tooltip>
          <Menu
            anchorEl={anchorActionList}
            open={openActionMenu}
            onClose={() => setAnchorActionList(null)}
          >
            {actionList.map((action) => (
              <MenuItem
                key={action.id}
                onClick={() => {
                  action.action();
                  setAnchorActionList(null);
                }}
              >
                <ListItemIcon>
                  <Icon icon={action.icon} fontSize={20} />
                </ListItemIcon>
                <Typography variant="button">{action.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid>
          <Tooltip title="網格顯示" color="inherit">
            <IconButton
              size="small"
              onClick={() => setViewMode({ mode: "grid" })}
            >
              <Icon
                icon="carbon:grid"
                fontSize={20}
                color={viewMode.mode === "grid" ? "LightBlue" : "black"}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="列表顯示" color="inherit">
            <IconButton
              size="small"
              onClick={() => setViewMode({ mode: "list" })}
            >
              <Icon
                icon="fa-solid:list-ul"
                fontSize={20}
                color={viewMode.mode === "list" ? "LightBlue" : "black"}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="選項" color="inherit">
            <Button
              size="small"
              onClick={(e) => setAnchorOptionList(e.currentTarget)}
            >
              <Typography variant="button">選項</Typography>
              <Icon
                icon="mdi:chevron-down"
                fontSize={20}
                style={{ marginLeft: 4 }}
              />
            </Button>
          </Tooltip>
          <Menu
            anchorEl={anchorOptionList}
            open={openOptionMenu}
            onClose={() => setAnchorOptionList(null)}
          >
            <MenuItem>
              <ListItemIcon>
                <Icon icon="tabler:sort-a-z" fontSize={20} />
              </ListItemIcon>
              <Typography variant="button">依名稱排序</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Icon icon="mdi:sort" fontSize={20} />
              </ListItemIcon>
              <Typography variant="button">依大小排序</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Icon icon="mdi:sort" fontSize={20} />
              </ListItemIcon>
              <Typography variant="button">依日期排序</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
