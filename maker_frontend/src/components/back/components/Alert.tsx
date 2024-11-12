"use client";

import { Snackbar, Alert } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import { setOpen } from "@/redux/slices/back/alertSlice";

const AlertMessage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  // Redux State
  const { open, message, severity } = useSelector((state) => state.alert);

  const onClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
