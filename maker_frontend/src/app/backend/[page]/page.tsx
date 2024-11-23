"use client";

// React
import React from "react";

// MUI
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Next.js
import { useParams } from "next/navigation";

// Hooks
import useList from "@/hooks/useList";

// Components
import MyTable from "@/components/back/components/Table";
import Buttons from "@/components/back/components/Buttons";
import { IndexToolbar } from "@/components/back/components/Toolbar";

// Config & Types
import type Api from "@/config/api";
import ConfirmDialog from "@/components/back/components/ConfirmDialog";
import FileManager from "@/components/back/pages/file-manager/file-manager";
import Dashboard from "@/components/back/pages/dashboard/dashboard";

const BackPage = () => {
  const params = useParams();
  const { page } = params;

  const {
    handleCreate,
    handleEdit,
    handleDelete,
    confirmOpen,
    handleConfirmDelete,
    handleCancelDelete,
  } = useList(page as keyof typeof Api.backend);

  const renderButton = () => {
    switch (page) {
      case "dashboard":
      case "file-manager":
        return null;
      default:
        return (
          <Grid size={12} display={"flex"} justifyContent="flex-end">
            <Buttons
              buttons={IndexToolbar(handleCreate, handleEdit, handleDelete)}
            />
          </Grid>
        );
    }
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "file-manager":
        return <FileManager />;
      default:
        return <MyTable />;
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {renderButton()}
        <Grid size={12}>{renderPage()}</Grid>
      </Grid>
      <ConfirmDialog
        open={confirmOpen}
        title="確認刪除"
        content="確定要刪除選中的資料嗎？"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default BackPage;
