// React
import React from "react";

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

const activity = {
  name: "活動 1",
  date: "2023-10-01",
  description:
    "這是活動 1 的詳細描述。這個活動將會非常有趣，歡迎大家踴躍參加。",
  image: "https://placehold.jp/800x400.png",
  registrationLink: "/register/1",
};

const ActivityInner = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {activity.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={activity.image}
              alt={activity.name}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                活動日期
              </Typography>
              <Typography variant="body1" gutterBottom>
                {activity.date}
              </Typography>
              <Typography variant="h6" gutterBottom>
                活動簡章
              </Typography>
              <Typography variant="body1" gutterBottom>
                {activity.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={activity.registrationLink}
                >
                  <Typography variant="button" sx={{ color: "white" }}>
                    前往報名
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityInner;
