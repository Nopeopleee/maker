// React
import React from "react";

// MUI
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Hooks
import useContent from "@/hooks/front/useContent";
import Helper from "@/lib/helper";

const NewsInner = () => {
  const { content } = useContent();

  const { content_details = [] } = content;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid container size={12}>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
              }}
            >
              <Typography variant="h3">{content.title}</Typography>
              <Typography variant="caption" color="gray">
                {Helper.getFormattedDate(
                  content.created_at,
                  "YYYY/MM/DD HH:mm"
                )}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsInner;
