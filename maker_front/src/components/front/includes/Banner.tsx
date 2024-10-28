"use client";

// Next.js
import Image from "next/image";
import { useParams } from "next/navigation";

// MUI
import { Box, Typography } from "@mui/material";

export default function Banner() {
  const params = useParams();
  const { page } = params;

  let pageName = page;

  switch (page) {
    case "about":
      pageName = "關於我們";
      break;
    case "activity":
      pageName = "活動報名";
      break;
    case "album":
      pageName = "活動相簿";
      break;
    case "contact":
      pageName = "聯絡我們";
      break;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: `calc(50vh - 68px)`, md: `calc(40vh - 68px)` },
        width: "100%",
        position: "relative",
      }}
    >
      <Image
        src="https://placehold.jp/1920x432.png"
        alt="placeholder"
        fill
        style={{ objectFit: "cover" }}
      />
      {/* 遮罩 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h3" color="white" align="center" fontWeight={700}>
          {pageName}
        </Typography>
      </Box>
    </Box>
  );
}
