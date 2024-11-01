// React
import React from "react";

// Next.js
import { useRouter } from "next/navigation";

// MUI
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const activities = [
  {
    name: "活動 1",
    alias: "activity-1",
    date: "2023-10-01 ~ 2023-10-10",
    description:
      "言論溝通就會人生一段時間媒體，不少客人台北皮膚開始都不海外成人演員，黃金房子魔法很難處理器恐怕水果每個顯示停止，感動問題動力檢測偉大傳奇不出賓館推廣我就實現消息回憶不限條件，管理系統吸引詳細內容一句接觸或者，部落微微確定楠雅尤其是天空年齡走了以前客服，各。",
    image: "https://placehold.jp/300x200.png",
  },
  {
    name: "活動 2",
    alias: "activity-2",
    date: "2023-10-15 ~ 2023-10-25",
    description:
      "言論溝通就會人生一段時間媒體，不少客人台北皮膚開始都不海外成人演員，黃金房子魔法很難處理器恐怕水果每個顯示停止，感動問題動力檢測偉大傳奇不出賓館推廣我就實現消息回憶不限條件，管理系統吸引詳細內容一句接觸或者，部落微微確定楠雅尤其是天空年齡走了以前客服，各。",
    image: "https://placehold.jp/300x200.png",
  },
  {
    name: "活動 3",
    alias: "activity-3",
    date: "2023-11-01 ~ 2023-11-10",
    description:
      "言論溝通就會人生一段時間媒體，不少客人台北皮膚開始都不海外成人演員，黃金房子魔法很難處理器恐怕水果每個顯示停止，感動問題動力檢測偉大傳奇不出賓館推廣我就實現消息回憶不限條件，管理系統吸引詳細內容一句接觸或者，部落微微確定楠雅尤其是天空年齡走了以前客服，各。",
    image: "https://placehold.jp/300x200.png",
  },
  {
    name: "活動 4",
    alias: "activity-4",
    date: "2023-11-15 ~ 2023-11-25",
    description:
      "言論溝通就會人生一段時間媒體，不少客人台北皮膚開始都不海外成人演員，黃金房子魔法很難處理器恐怕水果每個顯示停止，感動問題動力檢測偉大傳奇不出賓館推廣我就實現消息回憶不限條件，管理系統吸引詳細內容一句接觸或者，部落微微確定楠雅尤其是天空年齡走了以前客服，各。",
    image: "https://placehold.jp/300x200.png",
  },
];

const Activity = () => {
  const router = useRouter();

  const handleGoDetail = (alias: string) => {
    router.push(`/activity/${alias}`);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {activities.map((activity, index) => (
          <Grid size={12} key={index}>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: 300 }}
                image={activity.image}
                alt={activity.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {activity.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    日期：{activity.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {activity.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleGoDetail(activity.alias)}
                    >
                      <Typography
                        variant="button"
                        sx={{ textTransform: "none", color: "white" }}
                      >
                        查看詳情
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Activity;
