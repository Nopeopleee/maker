// Next.js
import Image from "next/image";

// MUI
import { Box, Typography } from "@mui/material";

interface BannerProps {
  title: string;
  image: string;
}

export default function Banner(props: BannerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: `calc(30vh - 68px)`, md: `calc(40vh - 68px)` },
        width: "100%",
        position: "relative",
      }}
    >
      <Image
        src={props.image}
        alt={props.title}
        fill
        priority
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
          {props.title}
        </Typography>
      </Box>
    </Box>
  );
}
