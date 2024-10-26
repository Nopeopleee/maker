"use client";

import { useParams } from "next/navigation";

export default function about() {
  const params = useParams();
  const { page } = params;

  return (
    <div>
      <h1>{page}</h1>
    </div>
  );
}
