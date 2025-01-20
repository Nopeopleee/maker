"use client";

// React
import React from "react";

// MUI
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Next.js
import { useParams } from "next/navigation";

// Hooks
import useInner from "@/hooks/back/useInner";

// Components
import Buttons from "@/components/back/components/Buttons";
import { InnerToolbar } from "@/components/back/components/Toolbar";

// Config & Types
import type Api from "@/config/api";

// Forms
import AdminForm from "@/components/back/forms/admin-forms/AdminForm";
import UserForm from "@/components/back/forms/user-forms/UserForm";
import MenuForm from "@/components/back/forms/menu-forms/MenuForm";
import HomepageForm from "@/components/back/forms/homepage-forms/HomepageForm";

// Interfaces
import type { ItemDetail, Options } from "@/interface/menu-form-props";
import ContentForm from "@/components/back/forms/content-forms/ContentForm";

const BackPage = () => {
  const params = useParams();

  // Params
  const { page, action } = params;

  const {
    handleSave,
    handleSaveClose,
    handleCancel,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    routerMap,
    itemDetail,
    options,
  } = useInner(page as keyof typeof Api.backend, action as string);

  const renderForm = () => {
    switch (page) {
      case "admins":
        return (
          <AdminForm
            itemDetail={itemDetail as ItemDetail}
            handleChange={handleChange}
          />
        );
      case "users":
        return (
          <UserForm
            itemDetail={itemDetail as ItemDetail}
            handleChange={handleChange}
          />
        );
      case "menus":
        return (
          <MenuForm
            itemDetail={itemDetail as ItemDetail}
            handleChange={handleChange}
            options={options as Options}
          />
        );
      case "homepages":
        return (
          <HomepageForm
            itemDetail={itemDetail as ItemDetail}
            handleChange={handleChange}
            options={options as Options}
          />
        );
      case "contents":
        return (
          <ContentForm
            itemDetail={itemDetail as ItemDetail}
            handleChange={handleChange}
            options={options as Options}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
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
