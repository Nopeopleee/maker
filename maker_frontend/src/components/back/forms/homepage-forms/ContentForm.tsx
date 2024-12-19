import MenuFormProps from "@/interface/menu-form-props";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import ImageSelector from "../../components/ImageSelector";
import { MenuItem } from "@mui/material";

const ContentForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange, options } = props;
  const { menu_list = [] } = options || {};

  return (
    <>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="標題"
          required
          variant="outlined"
          value={itemDetail?.home_details?.title || ""}
          onChange={(e) => handleChange("home_details.title", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="內容"
          required
          variant="outlined"
          select
          value={itemDetail?.menu_id || ""}
          onChange={(e) => handleChange("menu_id", e.target.value)}
        >
          {menu_list.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

export default ContentForm;
