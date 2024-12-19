import MenuFormProps from "@/interface/menu-form-props";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import ImageSelector from "../../components/ImageSelector";

const BannerForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange } = props;

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
        <ImageSelector
          value={(itemDetail?.home_details?.image_1 as string) || ""}
          column="home_details.image_1"
          label="底圖"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          value={(itemDetail?.home_details?.image_2 as string) || ""}
          column="home_details.image_2"
          label="圖片"
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};

export default BannerForm;
