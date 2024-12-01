import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  textFiled?: boolean;
  onChange?: (value: string) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
  textFiled,
  onChange,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {textFiled && (
          <TextField
            autoFocus
            size="small"
            margin="dense"
            fullWidth
            onChange={(e) => onChange && onChange(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          取消
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
