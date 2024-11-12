"use client";

// React
import React from "react";

// MUI
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Next.js
import { useParams } from "next/navigation";

// Hooks
import useInner from "@/hooks/useInner";

// Components
import Buttons from "@/components/back/components/Buttons";
import { InnerToolbar } from "@/components/back/components/Toolbar";

// Config & Types
import type Api from "@/config/api";

// Forms
import AdminForm from "@/components/back/forms/admin-forms/AdminForm";

const BackPage = () => {
  const params = useParams();

  // Params
  const { page, action } = params;

  const {
    handleSave,
    handleSaveClose,
    handleCancel,
    handleChange,
    routerMap,
    itemDetail,
  } = useInner(page as keyof typeof Api.backend, action as string);

  const renderForm = () => {
    switch (page) {
      case "admins":
        return (
          <AdminForm itemDetail={itemDetail} handleChange={handleChange} />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid
          size={12}
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{routerMap(page as string)}</Typography>
          <Buttons
            buttons={InnerToolbar(handleSave, handleSaveClose, handleCancel)}
          />
        </Grid>
        <Grid size={12}>
          <Divider />
        </Grid>
        <Grid size={12}>{renderForm()}</Grid>
      </Grid>
    </Box>
  );
};

export default BackPage;
