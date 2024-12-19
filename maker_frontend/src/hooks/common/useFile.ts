// React
import { useEffect, useState } from "react";

// Next.js
import { useSearchParams } from "next/navigation";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  getFileList,
  createFolder,
  deleteFile,
  uploadFiles,
  downloadFiles,
  fileSlice,
} from "@/redux/slices/back/fileSlice";
import { FileItem } from "@/components/back/components/file-manager/interface";

const useFile = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  // State
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [tempSelectedFiles, setTempSelectedFiles] = useState<string[]>([]);
  const [openDeleteFile, setOpenDeleteFile] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);

  // Redux State
  const { files = [], folderChain } = useSelector((state) => state.file);
  const currentPath = folderChain.map((folder) => folder.name).join("/");

  // Redux Action
  const { addFolderChain, goBack } = fileSlice.actions;

  useEffect(() => {
    dispatch(getFileList({ path: currentPath }));
  }, [dispatch, currentPath]);

  const handleDoubleClick = (event: React.MouseEvent, file: FileItem) => {
    if (file.isDir) {
      dispatch(addFolderChain({ name: file.name, isRoot: false }));
    } else if (mode === "select") {
      window.opener.postMessage(
        {
          type: "file-browser",
          filename: file.name,
          path: `${encodeURIComponent(currentPath)}%2F${file.name}`,
        },
        window.location.origin
      );
      window.close();
    }
  };

  const handleGoBack = () => {
    dispatch(goBack());
  };

  const deleteFileAction = {
    handleDeleteFile: () => {
      setTempSelectedFiles(selectedFiles);
      setOpenDeleteFile(true);
    },
    handleDeleteFileDialogClose: () => {
      setOpenDeleteFile(false);
      setTempSelectedFiles([]);
    },
    handleDeleteFileDialogSubmit: () => {
      setOpenDeleteFile(false);
      tempSelectedFiles.forEach((filename) => {
        dispatch(deleteFile({ filename }));
      });
      setTempSelectedFiles([]);
    },
  };

  const createFolderAction = {
    handleCreateFolder: () => {
      setOpenCreateFolder(true);
    },
    handleCreateFolderDialogClose: () => {
      setOpenCreateFolder(false);
    },
    handleCreateFolderDialogSubmit: (createFileName: string) => {
      setOpenCreateFolder(false);
      dispatch(createFolder({ folderName: createFileName }));
    },
  };

  const uploadFileAction = {
    handleUploadFile: () => {
      setOpenUploadFile(true);
    },
    handleUploadFileDialogClose: () => {
      setOpenUploadFile(false);
    },
    handleUploadFileDialogSubmit: (files: File[]) => {
      setOpenUploadFile(false);
      dispatch(uploadFiles({ files }));
    },
  };

  const downloadFilesAction = {
    handleDownloadFiles: () => {
      dispatch(downloadFiles({ filenames: selectedFiles }));
    },
  };

  return {
    files,
    folderChain,
    handleDoubleClick,
    selectedFiles,
    setSelectedFiles,
    handleGoBack,
    createFolderAction,
    deleteFileAction,
    uploadFileAction,
    downloadFilesAction,
    openCreateFolder,
    openDeleteFile,
    openUploadFile,
  };
};

export default useFile;
