// Next.js
import Image from "next/image";

// Mui
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const albums = [
  {
    title: "活動相簿1",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 1",
  },
  {
    title: "活動相簿2",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 2",
  },
  {
    title: "活動相簿3",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 3",
  },
  {
    title: "活動相簿4",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 4",
  },
  {
    title: "活動相簿5",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 5",
  },
];

const Album = () => {
  return (
    <Box maxWidth="xl" margin="auto" padding={2} mt={4}>
      <Grid container spacing={8} width={"100%"} maxWidth={"xl"}>
        {albums.map((album, index) => (
          <Grid size={6} p={4} key={index}>
            <Image
              src={album.image}
              alt={album.alt}
              width={1920}
              height={1080}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="h4"
              color="primary.dark"
              align="center"
              sx={{ mt: 4, fontWeight: "bold" }}
            >
              {album.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Album;
