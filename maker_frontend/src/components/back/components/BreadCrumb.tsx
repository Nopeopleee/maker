"use client";

// Next.js
import { useRouter, usePathname } from "next/navigation";

// MUI
import { Breadcrumbs, Link, Typography } from "@mui/material";

// Config
import sideNav from "@/config/side-nav";

const routerMap = (pathName: string): string => {
  const found = sideNav.find((nav) => nav.id === pathName);

  if (pathName === "backend") return "後臺管理";
  if (pathName === "create") return "新增";
  if (pathName === "edit") return "編輯";

  return found ? found.title : pathName;
};

const BreadCrumb = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={name}>{routerMap(name)}</Typography>
        ) : (
          <Link
            key={name}
            href={routeTo}
            underline="hover"
            variant="body1"
            onClick={(e) => router.push(routeTo)}
          >
            {routerMap(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
