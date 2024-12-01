// React
import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  getFileList,
  createFolder,
  deleteFile,
  uploadFiles,
  fileSlice,
} from "@/redux/slices/back/fileSlice";
import { FileItem } from "@/components/back/components/file-manager/interface";

const useFile = () => {
  const dispatch = useDispatch();

  // State
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [tempSelectedFiles, setTempSelectedFiles] = useState<string[]>([]);
  const [openDeleteFile, setOpenDeleteFile] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);

  // Redux State
  const { files, folderChain } = useSelector((state) => state.file);
  const currentPath = folderChain.map((folder) => folder.name).join("/");

  // Redux Action
  const { addFolderChain, goBack } = fileSlice.actions;

  useEffect(() => {
    dispatch(getFileList({ path: currentPath }));
  }, [dispatch, currentPath]);

  const handleDoubleClick = (event: React.MouseEvent, file: FileItem) => {
    if (file.isDir) {
      dispatch(addFolderChain({ name: file.name, isRoot: false }));
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
    openCreateFolder,
    openDeleteFile,
    openUploadFile,
  };
};

export default useFile;
