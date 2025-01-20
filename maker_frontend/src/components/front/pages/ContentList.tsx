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
  Button,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useContent from "@/hooks/front/useContent";
import Helper from "@/lib/helper";
import Image from "next/image";

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
                    variant="body1"
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
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {Helper.formatTextBreakRow(content.description).map(
                      (line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      )
                    )}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 1.5,
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
