// Next.js
import Image from "next/image";

// Mui
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

const albums = [
  {
    title: "活動相簿1",
    alias: "album-1",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 1",
  },
  {
    title: "活動相簿2",
    alias: "album-2",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 2",
  },
  {
    title: "活動相簿3",
    alias: "album-3",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 3",
  },
  {
    title: "活動相簿4",
    alias: "album-4",
    image: "https://placehold.jp/1920x1080.png",
    alt: "Album 4",
  },
  {
    title: "活動相簿5",
    alias: "album-5",
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
            <Link href={`/album/${album.alias}`} passHref>
              <Image
                src={album.image}
                alt={album.alt}
                width={1920}
                height={1080}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </Link>
            <Link href={`/album/${album.alias}`} passHref>
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
