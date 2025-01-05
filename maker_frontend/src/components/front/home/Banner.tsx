// Next.js
import Image from "next/image";

// MUI
import { Box } from "@mui/material";

// Interface
import { HomeBanner } from "@/interface/page";

// Lib
import Helper from "@/lib/helper";

export default function Banner(props: HomeBanner) {
  const { image_1, image_2 } = props;

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
        src={Helper.getFilePath(image_1)}
        alt="placeholder"
        fill
        style={{ objectFit: "cover" }}
        priority
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
          src={Helper.getFilePath(image_2)}
          alt="為創而做 Maker"
          width={645}
          height={205}
          style={{ width: "645px", height: "205px", objectFit: "cover" }}
          priority
        />
      </Box>
    </Box>
  );
}
