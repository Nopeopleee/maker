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

const activity = {
  name: "活動 1",
  date: "2023-10-01",
  description:
    "這是活動 1 的詳細描述。這個活動將會非常有趣，歡迎大家踴躍參加。",
  image: "https://placehold.jp/800x400.png",
};

const card = [
  {
    title: "營隊資訊",
    content: "這是營隊的資訊。",
  },
  {
    title: "報名費用",
    content: "這是報名費用的資訊。",
  },
  {
    title: "師資陣容",
    content: "這是師資陣容的資訊。",
  },
  {
    title: "注意事項",
    content: "這是注意事項的資訊。",
  },
];

const ActivityInner = () => {
  const router = useRouter();
  const pathName = usePathname();

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
              image={activity.image}
              alt={activity.name}
            />
          </Card>
        </Grid>
        {card.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {index + 1}
                  {". "}
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
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
            >
              <Typography
                variant="h6"
                color="white"
                fontWeight={700}
                onClick={handleGoToRegistration}
              >
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
