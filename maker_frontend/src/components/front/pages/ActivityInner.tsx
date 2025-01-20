// React
import React from "react";

// Next.js
import { useRouter, usePathname } from "next/navigation";

// MUI
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Hooks
import useContent from "@/hooks/front/useContent";

// Lib
import Helper from "@/lib/helper";

const ActivityInner = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { content } = useContent();

  const { content_details = [] } = content;

  const handleGoToRegistration = () => {
    router.push(`${pathName}/registration`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={Helper.getFilePath(content.image)}
              alt={content.title}
            />
          </Card>
        </Grid>
        <Grid size={12}>
          <Typography
            className="ql-editor"
            component={"div"}
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        </Grid>
        {content_details.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {index + 1}
                  {". "}
                  {item.title}
                </Typography>
                {Helper.formatTextBreakRow(item.text).map((text, i) => (
                  <Typography key={i} variant="body1" color="text.secondary">
                    {text}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={12} sx={{ textAlign: "center" }}>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                padding: "16px 32px",
                fontSize: "1.25rem",
                borderRadius: "9999px",
              }}
              onClick={handleGoToRegistration}
            >
              <Typography variant="h6" color="white" fontWeight={700}>
                我要報名
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityInner;
