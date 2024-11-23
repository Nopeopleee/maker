"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setRouter } from "@/lib/redirect";

const ClientRouterProvider = () => {
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  return null;
};

export default ClientRouterProvider;
