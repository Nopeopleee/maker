import MenuFormProps from "@/interface/menu-form-props";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import ImageSelector from "../../components/ImageSelector";

const IntroForm = (props: MenuFormProps) => {
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
        <TextField
          size="small"
          fullWidth
          label="副標題"
          required
          variant="outlined"
          value={itemDetail?.home_details?.subtitle || ""}
          onChange={(e) =>
            handleChange("home_details.subtitle", e.target.value)
          }
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          value={(itemDetail?.home_details?.image_1 as string) || ""}
          column="home_details.image_1"
          label="圖一"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          value={(itemDetail?.home_details?.image_2 as string) || ""}
          column="home_details.image_2"
          label="圖二"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          value={(itemDetail?.home_details?.image_3 as string) || ""}
          column="home_details.image_3"
          label="圖三"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="標題一"
          required
          variant="outlined"
          value={itemDetail?.home_details?.link_1 || ""}
          onChange={(e) => handleChange("home_details.link_1", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="標題二"
          required
          variant="outlined"
          value={itemDetail?.home_details?.link_2 || ""}
          onChange={(e) => handleChange("home_details.link_2", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="標題三"
          required
          variant="outlined"
          value={itemDetail?.home_details?.link_3 || ""}
          onChange={(e) => handleChange("home_details.link_3", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="內容一"
          required
          variant="outlined"
          multiline
          rows={4}
          value={itemDetail?.home_details?.content_1 || ""}
          onChange={(e) =>
            handleChange("home_details.content_1", e.target.value)
          }
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="內容二"
          required
          variant="outlined"
          multiline
          rows={4}
          value={itemDetail?.home_details?.content_2 || ""}
          onChange={(e) =>
            handleChange("home_details.content_2", e.target.value)
          }
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          size="small"
          fullWidth
          label="內容三"
          required
          variant="outlined"
          multiline
          rows={4}
          value={itemDetail?.home_details?.content_3 || ""}
          onChange={(e) =>
            handleChange("home_details.content_3", e.target.value)
          }
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <ImageSelector
          value={(itemDetail?.home_details?.image_4 as string) || ""}
          column="home_details.image_4"
          label="圖四"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <TextField
          size="small"
          fullWidth
          label="內容四"
          required
          variant="outlined"
          multiline
          rows={4}
          value={itemDetail?.home_details?.content_4 || ""}
          onChange={(e) =>
            handleChange("home_details.content_4", e.target.value)
          }
        />
      </Grid>
    </>
  );
};

export default IntroForm;
