import SideNav from "@/components/back/layout/SideNav";
import TopNav from "@/components/back/layout/TopNav";
import { Box, Card, CardContent, Divider } from "@mui/material";

// Components
import BreadCrumb from "@/components/back/components/BreadCrumb";

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
              border: "1px solid #f4f4f4",
              boxSizing: "border-box",
              boxShadow: "4px 4px 8px 0 rgba(0,0,0,0.2)",
            }}
          >
            <CardContent>
              <BreadCrumb />
              <Divider sx={{ mt: 2, mb: 4 }} />
              {children}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default BackendLayout;
