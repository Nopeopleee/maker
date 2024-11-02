// Mui
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const experiences = [
  "2019印尼IEYI世界青少年創客發明展【銅牌獎】",
  "107年度 全國教育桌遊設計競賽 【高中職以上及社會組 第二名】",
  "2017IEYI世界青少年創客發明展台灣選拔賽【金牌獎-台灣代表隊】【2項銅牌】",
  "2018IEYI世界青少年創客發明展台灣選拔賽【金牌獎-台灣代表隊】【2項銀牌】",
  "高雄市2017 Maker創意發明競賽【第二名】【第三名】【優等】【2項佳作】",
  "高雄市2018 Maker創意發明競賽【第二名】【第三名】【8項佳作】",
];

const About = () => {
  return (
    <Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"start"}
        padding={4}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          width={"100%"}
          maxWidth={"xl"}
        >
          <Grid size={12}>
            <Typography
              variant="h4"
              color="primary.dark"
              align="center"
              fontWeight={"bold"}
            >
              團隊經歷
            </Typography>
          </Grid>
          <Grid container spacing={2} size={12}>
            {experiences.map((experience, index) => (
              <Grid size={12} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  bgcolor="primary.light"
                  padding={2}
                  borderRadius={2}
                  boxShadow={1}
                >
                  <PlayArrowIcon
                    sx={{ marginRight: 2 }}
                    style={{ color: "#fff" }}
                  />
                  <Typography variant="body1" align="left" fontWeight={"bold"}>
                    {experience}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid size={12}>
            <Typography
              variant="h4"
              color="primary.dark"
              align="center"
              fontWeight={"bold"}
            >
              帶隊經歷
            </Typography>
          </Grid>
          <Grid container spacing={2} size={12}>
            {experiences.map((experience, index) => (
              <Grid size={12} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  bgcolor="primary.light"
                  padding={2}
                  borderRadius={2}
                  boxShadow={1}
                >
                  <PlayArrowIcon
                    sx={{ marginRight: 2 }}
                    style={{ color: "#fff" }}
                  />
                  <Typography variant="body1" align="left" fontWeight={"bold"}>
                    {experience}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
