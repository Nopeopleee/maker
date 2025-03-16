// MUI
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";

// Components
import ImageSelector from "@/components/back/components/ImageSelector";

const ContactForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange } = props;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="電話"
          required
          variant="outlined"
          value={itemDetail?.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
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
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="Facebook"
          required
          variant="outlined"
          value={itemDetail?.facebook || ""}
          onChange={(e) => handleChange("facebook", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          label="Facebook 圖片"
          column="facebook_img"
          value={(itemDetail?.facebook_img as string) || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="Instagram"
          required
          variant="outlined"
          value={itemDetail?.instagram || ""}
          onChange={(e) => handleChange("instagram", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          label="Instagram 圖片"
          column="instagram_img"
          value={(itemDetail?.instagram_img as string) || ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          size="small"
          fullWidth
          label="地址"
          required
          variant="outlined"
          value={itemDetail?.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default ContactForm;
