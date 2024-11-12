// MUI
import {
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface ItemDetail {
  [key: string]: string | number | boolean;
}

const AdminForm = ({
  itemDetail,
  handleChange,
}: {
  itemDetail: ItemDetail;
  handleChange: (key: string, value: string | number | boolean) => void;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="電子郵件"
          name="email"
          required
          variant="outlined"
          value={itemDetail?.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="名稱"
          name="name"
          required
          variant="outlined"
          value={itemDetail?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="密碼"
          name="password"
          type="password"
          variant="outlined"
          value={itemDetail?.password || ""}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          label="確認密碼"
          name="password_confirmation"
          type="password"
          variant="outlined"
          value={itemDetail?.password_confirmation || ""}
          onChange={(e) =>
            handleChange("password_confirmation", e.target.value)
          }
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl>
          <FormLabel required>狀態</FormLabel>
          <RadioGroup
            row
            name="status"
            value={itemDetail?.status || ""}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <FormControlLabel
              value={true}
              control={<Radio size="small" />}
              label="啟用"
            />
            <FormControlLabel
              value={false}
              control={<Radio size="small" />}
              label="停用"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AdminForm;
