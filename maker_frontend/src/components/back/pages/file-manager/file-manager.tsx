// React
import { useState } from "react";

// FileManager
import FileManager from "@/components/back/components/file-manager/file-manager";
import {
  ActionItem,
  ActionListItem,
  ContextActionItem,
} from "@/components/back/components/file-manager/interface";

// Hooks
import useFile from "@/hooks/useFile";

// Components
import ConfirmDialog from "@/components/back/components/ConfirmDialog";

const FileManagerPage = () => {
  const [filename, setFilename] = useState<string>("");

  const {
    files,
    folderChain,
    handleDoubleClick,
    selectedFiles,
    setSelectedFiles,
    createFolderAction,
    deleteFileAction,
    openDeleteFile,
    openCreateFolder,
  } = useFile();

  const actions: ActionItem[] = [
    {
      id: "1",
      label: "上傳檔案",
      tooltip: "上傳檔案",
      icon: "material-symbols:upload",
      action: () => console.log("上傳檔案"),
    },
    {
      id: "2",
      label: "新增資料夾",
      tooltip: "新增資料夾",
      icon: "mdi:folder-plus",
      action: () => createFolderAction.handleCreateFolder(),
    },
    {
      id: "3",
      label: "刪除檔案",
      tooltip: "刪除檔案",
      icon: "mdi:delete",
      action: () => deleteFileAction.handleDeleteFile(),
    },
  ];

  const actionList: ActionListItem[] = [
    {
      id: "1",
      label: "刪除",
      icon: "mdi:delete",
      action: () => console.log("刪除"),
    },
    {
      id: "2",
      label: "移動",
      icon: "mdi:folder-move",
      action: () => console.log("移動"),
    },
    {
      id: "3",
      label: "複製",
      icon: "mdi:content-copy",
      action: () => console.log("複製"),
    },
  ];

  const contextActions: ContextActionItem[] = [
    {
      id: "1",
      label: "刪除",
      tooltip: "刪除",
      icon: "mdi:delete",
      hasSelected: true,
      action: () => deleteFileAction.handleDeleteFile(),
    },
    {
      id: "2",
      label: "複製",
      tooltip: "複製",
      icon: "mdi:content-copy",
      hasSelected: true,
      action: () => console.log("複製", selectedFiles),
    },
    {
      id: "3",
      label: "貼上",
      tooltip: "貼上",
      icon: "mdi:content-paste",
      hasSelected: false,
      action: () => console.log("貼上", selectedFiles),
    },
    {
      id: "4",
      label: "重新命名",
      tooltip: "重新命名",
      icon: "mdi:pencil",
      hasSelected: true,
      action: () => console.log("重新命名", selectedFiles),
    },
    {
      id: "5",
      label: "全選",
      tooltip: "全選",
      icon: "mdi:select-all",
      hasSelected: false,
      action: () => console.log("全選", selectedFiles),
    },
    {
      id: "6",
      label: "下載",
      tooltip: "下載",
      icon: "mdi:download",
      hasSelected: true,
      action: () => console.log("下載", selectedFiles),
    },
  ];

  return (
    <>
      <FileManager
        files={files}
        folderChain={folderChain}
        actions={actions}
        actionList={actionList}
        contextActions={contextActions}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        handleDoubleClick={handleDoubleClick}
      />
      <ConfirmDialog
        open={openDeleteFile}
        onCancel={deleteFileAction.handleDeleteFileDialogClose}
        onConfirm={deleteFileAction.handleDeleteFileDialogSubmit}
        title="刪除檔案"
        content="確定要刪除檔案？"
      />
      <ConfirmDialog
        open={openCreateFolder}
        onCancel={createFolderAction.handleCreateFolderDialogClose}
        onConfirm={() => {
          createFolderAction.handleCreateFolderDialogSubmit(filename);
          setFilename("");
        }}
        title="新增資料夾"
        content="請輸入資料夾名稱"
        textFiled
        onChange={(value) => setFilename(value)}
      />
    </>
  );
};

export default FileManagerPage;
