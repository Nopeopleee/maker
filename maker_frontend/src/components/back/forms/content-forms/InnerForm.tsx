// MUI
import {
  TextField,
  Divider,
  Card,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Components
import TextEditor from "@/components/back/components/editor/TextEditor";
import ImageSelector from "@/components/back/components/ImageSelector";
import { Icon } from "@iconify/react/dist/iconify.js";

// Interfaces
import { ItemDetail } from "@/interface/menu-form-props";

interface Props {
  itemDetail: ItemDetail;
  handleChange: (key: string, value: any, index?: number) => void;
  handleAddItem: (column: string) => void;
  handleRemoveItem: (column: string, index: number) => void;
  content_details: ItemDetail[];
}

const InnerForm = (props: Props) => {
  const {
    itemDetail,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    content_details,
  } = props;

  return (
    <>
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
          label="副標題"
          variant="outlined"
          value={itemDetail?.subtitle || ""}
          onChange={(e) => handleChange("subtitle", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <ImageSelector
          value={(itemDetail?.image as string) || ""}
          column="image"
          label="封面圖片"
          onChange={handleChange}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          size="small"
          fullWidth
          label="簡介"
          variant="outlined"
          multiline
          maxRows={8}
          value={itemDetail?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <TextEditor
          value={(itemDetail?.text as string) || ""}
          setValue={(value) => handleChange("text", value)}
        />
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      {(content_details as Array<ItemDetail>)?.map((content, index) => (
        <Grid key={index} size={3}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={12} display="flex" justifyContent="space-between">
                  <Typography variant="h6">{index + 1}</Typography>
                  <IconButton
                    onClick={() => handleRemoveItem("content_details", index)}
                    sx={{
                      "&:hover": {
                        color: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <Icon icon="tabler:trash" />
                  </IconButton>
                </Grid>
                <Grid size={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="標題"
                    required
                    variant="outlined"
                    value={content.title || ""}
                    onChange={(e) =>
                      handleChange(
                        `content_details.title`,
                        e.target.value,
                        index
                      )
                    }
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="內容"
                    variant="outlined"
                    multiline
                    maxRows={8}
                    value={content.text || ""}
                    onChange={(e) =>
                      handleChange(
                        `content_details.text`,
                        e.target.value,
                        index
                      )
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid size={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddItem("content_details")}
        >
          <Typography variant="button" color="white" fontWeight={700}>
            新增
          </Typography>
        </Button>
      </Grid>
    </>
  );
};

export default InnerForm;
