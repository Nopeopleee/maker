// Next.js
import Image from "next/image";

// Mui
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import useContent from "@/hooks/front/useContent";
import { useEffect } from "react";
import Helper from "@/lib/helper";

const Album = () => {
  const { page, contents, handleFetchContentList } = useContent();

  useEffect(() => {
    handleFetchContentList();
  }, []);

  return (
    <Box maxWidth="xl" margin="auto" padding={2} mt={4}>
      <Grid container spacing={8} width={"100%"} maxWidth={"xl"}>
        {contents.map((album, index) => (
          <Grid size={6} p={4} key={index}>
            <Link href={`/${page}/${album.alias}`} passHref>
              <Box sx={{ width: "100%", height: 300 }}>
                <Image
                  src={Helper.getFilePath(album.image)}
                  alt={album.title}
                  width={1920}
                  height={1080}
                  priority
                  unoptimized
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Link>
            <Link
              href={`/${page}/${album.alias}`}
              passHref
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h4"
                color="primary.dark"
                align="center"
                sx={{ mt: 4, fontWeight: "bold" }}
              >
                {album.title}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Album;
