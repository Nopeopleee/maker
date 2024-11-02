import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData = {} as FormData, setFormData] = useState<FormData>();
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="姓名"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="電子郵件"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="subject"
                label="主旨"
                name="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="message"
                label="訊息"
                name="message"
                multiline
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Typography
              variant="button"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              提交
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{ my: 4, width: "100%" }}
          p={2}
          border={1}
          borderRadius={1}
          borderColor={"primary.main"}
          boxShadow={1}
        >
          <Typography variant="h6" gutterBottom>
            聯絡資訊
          </Typography>
          <Typography variant="body1">
            地址：台北市中正區忠孝東路一段100號
          </Typography>
          <Typography variant="body1">電話：02-1234-5678</Typography>
          <Typography variant="body1">電子郵件：info@example.com</Typography>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          訊息已成功發送！
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
