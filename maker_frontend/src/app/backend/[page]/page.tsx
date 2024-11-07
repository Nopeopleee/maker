"use client";

// React
import React from "react";

// Next.js
import { useParams } from "next/navigation";

// Hooks
import useList from "@/hooks/useList";

// Components
import MyTable from "@/components/back/components/Table";

// Config & Types
import type Api from "@/config/api";

const BackPage = () => {
  const params = useParams();
  const { page } = params;

  useList(page as keyof typeof Api.backend);

  return (
    <div>
      <MyTable />
    </div>
  );
};

export default BackPage;
