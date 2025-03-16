"use client";

// React
import React from "react";

// Mui
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useContent from "@/hooks/front/useContent";
import Helper from "@/lib/helper";

const AlbumInner = () => {
  const { content } = useContent();

  const { content_details = [] } = content;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {content_details.map((photo, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={Helper.getFilePath(photo.image)}
                alt={photo.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {photo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Helper.formatTextBreakRow(photo.text).map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AlbumInner;
