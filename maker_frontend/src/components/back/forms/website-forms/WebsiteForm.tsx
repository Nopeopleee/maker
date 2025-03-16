// MUI
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";

const WebsiteForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange } = props;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="網站名稱"
          required
          variant="outlined"
          value={itemDetail?.website_title || ""}
          onChange={(e) => handleChange("website_title", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
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
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="聯絡信箱"
          required
          variant="outlined"
          value={itemDetail?.contact_email || ""}
          onChange={(e) => handleChange("contact_email", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default WebsiteForm;
