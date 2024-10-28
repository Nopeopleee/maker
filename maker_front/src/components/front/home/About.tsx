"use client";

// Next.js
import Image from "next/image";

// MUI
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function About() {
  return (
    <Box maxWidth="xl" margin="auto">
      <Grid container spacing={2} justifyContent="center">
        <Grid size={12}>
          <Typography
            variant="h4"
            color="primary.dark"
            align="center"
            sx={{ mt: 4, fontWeight: "bold" }}
          >
            <span className="text-red-600">為創</span>造價值，
            <span className="text-red-600">而做</span>出改變。
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" align="center">
            這句話是我們的目標；為了創造每一位來學習的學員，所擁有最獨特的價值，我們不斷嘗試著改變。
          </Typography>
        </Grid>
        <Grid
          maxWidth="xl"
          margin="auto"
          container
          spacing={6}
          size={12}
          mt={4}
          display={{ xs: "block", md: "flex" }}
          justifyContent={{ xs: "center", md: "space-around" }}
          width={{ xs: "100%", md: "auto" }}
        >
          <Grid size={4} maxWidth={360}>
            <Image
              src="https://placehold.jp/360x360.png"
              alt="Mission"
              width={360}
              height={360}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              改變學習環境
            </Typography>
            <Typography variant="body1" align="center">
              擺脫了考試，我們希望學習的過程不是強迫，而是感受學習的過程，與夥伴一起享受。
            </Typography>
          </Grid>
          <Grid size={4} maxWidth={360}>
            <Image
              src="https://placehold.jp/360x360.png"
              alt="Mission"
              width={360}
              height={360}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              改變學習目的
            </Typography>
            <Typography variant="body1" align="center">
              透過競賽積分等等方式，目的可以是爭取冠軍，也可以是追求成就，共享榮譽，激發學習動力。
            </Typography>
          </Grid>
          <Grid size={4} maxWidth={360}>
            <Image
              src="https://placehold.jp/360x360.png"
              alt="Mission"
              width={360}
              height={360}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              align="center"
              mt={2}
              color="primary.dark"
              style={{ fontWeight: "bold" }}
            >
              改變學習意義
            </Typography>
            <Typography variant="body1" align="center">
              努力有汗水，學習有挫折，比賽有輸贏，過程有歡樂；只要用心付出，都會成為最美的回憶。
            </Typography>
          </Grid>
        </Grid>
        <Grid size={12} maxWidth={720} mt={4}>
          <Image
            src="https://placehold.jp/720x540.png"
            alt="Mission"
            width={720}
            height={540}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <Typography variant="body1" align="center" mt={2} lineHeight={2}>
            我們也曾經是學生。我們體驗比賽的刺激，承受挫折的洗禮，看見得獎的喜悅，享受學習的過程。我們擁有過最深的感動；然而，為創而做邀請你，創造屬於你與我們的悸動。
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
