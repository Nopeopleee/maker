// Next.js
import Image from "next/image";

// MUI
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Image src="/assets/images/logo.png" alt="Logo" width={32} height={32} />
    </Box>
  );
}
