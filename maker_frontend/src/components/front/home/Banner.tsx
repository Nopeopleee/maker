// Next.js
import Image from "next/image";

// MUI
import { Box } from "@mui/material";

export default function Banner() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: `calc(50vh - 68px)`, md: `calc(50vh - 68px)` },
        width: "100%",
        position: "relative",
      }}
    >
      <Image
        src="https://placehold.jp/1920x540.png"
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
        <Image
          src="/assets/images/title_white.png"
          alt="為創而做 Maker"
          width={645}
          height={205}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}
