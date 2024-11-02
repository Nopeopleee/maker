"use client";

import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        抱歉，您訪問的頁面不存在。
      </Typography>
      <Typography variant="body1" gutterBottom>
        您可以點擊下方按鈕返回首頁。
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        <Typography variant="body1" color="white">
          返回首頁
        </Typography>
      </Button>
    </Container>
  );
};

export default NotFound;
