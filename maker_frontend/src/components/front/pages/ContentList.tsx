// React
import React, { useEffect } from "react";

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
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useContent from "@/hooks/front/useContent";
import Helper from "@/lib/helper";
import Image from "next/image";

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

const ContentList = () => {
  const router = useRouter();
  const { page, contents, handleFetchContentList } = useContent();

  useEffect(() => {
    handleFetchContentList();
  }, []);

  const handleGoDetail = (alias: string) => {
    router.push(`/${page}/${alias}`);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {contents.map((content, index) => (
          <Grid size={12} key={index}>
            <Card sx={{ display: "flex" }}>
              <Box sx={{ width: 300, height: 230 }}>
                <Image
                  src={Helper.getFilePath(content.image)}
                  alt={content.title}
                  width={300}
                  height={230}
                  priority
                  unoptimized
                  style={{
                    width: "300px",
                    height: "230px",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {content.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {content.subtitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3, // 顯示三行，超出部分省略
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {content.description?.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleGoDetail(content.alias)}
                  >
                    <Typography
                      variant="button"
                      sx={{ textTransform: "none", color: "white" }}
                    >
                      查看詳情
                    </Typography>
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContentList;
