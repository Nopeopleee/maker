// MUI
import {
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";

const MenuForm = ({ itemDetail, handleChange, options }: MenuFormProps) => {
  const { type_list = [] } = options || {};

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
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="類型"
                  required
                  variant="outlined"
                  select
                  value={itemDetail?.type || ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  {type_list.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="選單名稱"
                  required
                  variant="outlined"
                  value={itemDetail?.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MenuForm;
