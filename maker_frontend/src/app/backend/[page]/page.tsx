"use client";

// React
import React from "react";

// Next.js
import { useParams } from "next/navigation";

const BackPage = () => {
  const params = useParams();
  const { page } = params;

  return <div>Backend Page: {page}</div>;
};

export default BackPage;
