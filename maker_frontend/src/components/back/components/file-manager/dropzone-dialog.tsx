import { Dialog, DialogContent } from "@mui/material";
import Dropzone from "./dropzone";

interface DropzoneDialogProps {
  openUploadFile: boolean;
  uploadFileAction: {
    handleUploadFileDialogClose: () => void;
    handleUploadFileDialogSubmit: (files: File[]) => void;
  };
}

const DropzoneDialog = (props: DropzoneDialogProps) => {
  const { openUploadFile, uploadFileAction } = props;

  return (
    <Dialog
      open={openUploadFile}
      onClose={uploadFileAction.handleUploadFileDialogClose}
      scroll="body"
    >
      <DialogContent sx={{ width: "100%" }}>
        <Dropzone uploadFiles={uploadFileAction.handleUploadFileDialogSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default DropzoneDialog;
