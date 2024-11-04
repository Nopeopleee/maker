"use client";

import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AppProgressBar
        height="4px"
        color="#a0815f"
        options={{ showSpinner: false }}
        shallowRouting={true}
      />
    </>
  );
};

export default ProgressBar;
