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

// Interfaces
import type MenuFormProps from "@/interface/menu-form-props";
import BannerForm from "./BannerForm";
import ContentForm from "./ContentForm";
import IntroForm from "./IntroForm";

const HomepageForm = (props: MenuFormProps) => {
  const { itemDetail, handleChange, options } = props;

  const { type_list = [] } = options || {};

  const renderForm = () => {
    switch (Number(itemDetail?.type)) {
      case 1:
        return (
          <BannerForm itemDetail={itemDetail} handleChange={handleChange} />
        );
      case 2:
        return (
          <ContentForm
            itemDetail={itemDetail}
            handleChange={handleChange}
            options={options}
          />
        );
      case 3:
        return (
          <IntroForm itemDetail={itemDetail} handleChange={handleChange} />
        );
      default:
        return null;
    }
  };

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
              {renderForm()}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomepageForm;
