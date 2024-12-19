// MUI
import {
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";

const AdminForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange } = props;

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
                  label="電子郵件"
                  required
                  variant="outlined"
                  value={itemDetail?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="名稱"
                  required
                  variant="outlined"
                  value={itemDetail?.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="密碼"
                  type="password"
                  variant="outlined"
                  value={itemDetail?.password || ""}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="確認密碼"
                  type="password"
                  variant="outlined"
                  value={itemDetail?.password_confirmation || ""}
                  onChange={(e) =>
                    handleChange("password_confirmation", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminForm;
