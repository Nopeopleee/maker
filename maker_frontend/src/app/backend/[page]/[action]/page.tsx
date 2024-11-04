"use client";

// React
import React from "react";

// Next.js
import { useParams } from "next/navigation";

const BackPage = () => {
  const params = useParams();
  const { page, action } = params;

  return (
    <>
      <div>Backend Page: {page}</div>
      <div>Backend Action: {action}</div>
    </>
  );
};

export default BackPage;
