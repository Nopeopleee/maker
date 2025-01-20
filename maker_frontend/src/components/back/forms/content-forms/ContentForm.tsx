"use client";

// MUI
import {
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Components
import TextEditor from "@/components/back/components/editor/TextEditor";
import ImageSelector from "@/components/back/components/ImageSelector";
import { Icon } from "@iconify/react/dist/iconify.js";

// Interfaces
import type {
  ItemDetail,
  MenuFormProps,
  Add,
  Remove,
} from "@/interface/menu-form-props";
import React from "react";
import InnerForm from "./InnerForm";
import AlbumForm from "./AlbumForm";

const ContentForm = (props: MenuFormProps & Add & Remove) => {
  const { itemDetail, handleChange, options, handleAddItem, handleRemoveItem } =
    props;

  const { menu_list = [] } = options || {};

  const { content_details = [] } = itemDetail || {};

  const [menuType, setMenuType] = React.useState<number | null>(null);

  React.useEffect(() => {
    setMenuType(
      Number(
        (
          menu_list.find(
            (item) => item.id === itemDetail?.menu_id
          ) as unknown as {
            type: number;
          }
        )?.type
      ) || null
    );
  }, [menu_list, itemDetail?.menu_id]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12 }}>
        <FormControlLabel
          required
          control={
            <Switch
              checked={(itemDetail?.status as boolean) || false}
              onChange={(e) => handleChange("status", e.target.checked)}
            />
          }
          label={itemDetail?.status ? "啟用" : "停用"}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="選單"
                  required
                  variant="outlined"
                  select
                  value={itemDetail?.menu_id || ""}
                  onChange={(e) => handleChange("menu_id", e.target.value)}
                >
                  {menu_list.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {[3, 4].includes(menuType as number) && (
                <InnerForm
                  itemDetail={itemDetail}
                  handleChange={handleChange}
                  handleAddItem={handleAddItem}
                  handleRemoveItem={handleRemoveItem}
                  content_details={content_details as Array<ItemDetail>}
                />
              )}
              {[5].includes(menuType as number) && (
                <AlbumForm
                  itemDetail={itemDetail}
                  handleChange={handleChange}
                  handleAddItem={handleAddItem}
                  handleRemoveItem={handleRemoveItem}
                  content_details={content_details as Array<ItemDetail>}
                />
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContentForm;
