import SideNav from "@/components/back/layout/SideNav";
import TopNav from "@/components/back/layout/TopNav";
import { Box, Card } from "@mui/material";

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <TopNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default BackendLayout;
