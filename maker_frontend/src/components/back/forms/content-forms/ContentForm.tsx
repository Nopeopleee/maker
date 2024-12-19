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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Components
import TextEditor from "@/components/back/components/editor/TextEditor";

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";

const ContentForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange, options } = props;

  const { menu_list = [] } = options || {};

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
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="連結"
                  required
                  variant="outlined"
                  value={itemDetail?.alias || ""}
                  onChange={(e) => handleChange("alias", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="標題"
                  required
                  variant="outlined"
                  value={itemDetail?.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="圖片 ALT"
                  required
                  variant="outlined"
                  value={itemDetail?.home_details?.image_alt || ""}
                  onChange={(e) =>
                    handleChange("home_details.image_alt", e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                <TextEditor
                  value={(itemDetail?.text as string) || ""}
                  setValue={(value) => handleChange("text", value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ContentForm;
