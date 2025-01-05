// React
import React from "react";

// MUI
import { Box, Container, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Hooks
import useContent from "@/hooks/front/useContent";
import Helper from "@/lib/helper";

const NewsInner = () => {
  const { content } = useContent();

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
              <Typography variant="h2">{content.title}</Typography>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsInner;
