// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setMessage,
  setSeverity,
  setOpen,
} from "@/redux/slices/back/alertSlice";

// Config
import Api from "@/config/api";

// Axios
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

// Interface
import { FolderChainItem } from "@/components/back/components/file-manager/interface";

interface fileState {
  files?: any;
  folderChain: FolderChainItem[];
}

const initialState: fileState = {
  files: [],
  folderChain: [{ name: "system", isRoot: true }],
};

// Get File List
export const getFileList = createAsyncThunk(
  "file/getFileList",
  async (params: { path: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${Api.backend.files.index}?filePath=${params.path}`
      );

      return response.data;
    } catch (e: any) {
      thunkAPI.dispatch(setMessage("取得檔案列表失敗"));
      thunkAPI.dispatch(setSeverity("error"));
      thunkAPI.dispatch(setOpen(true));
    }
  }
);

// Delete File
export const deleteFile = createAsyncThunk(
  "file/deleteFile",
  async (params: { filename: string }, thunkAPI) => {
    try {
      const { filename } = params;

      const state = thunkAPI.getState() as { file: fileState };
      const folderChain = state.file.folderChain;
      const currentPath = folderChain.map((folder) => folder.name).join("/");

      const response = await axiosInstance.delete(
        `${Api.backend.files.index}/${encodeURIComponent(
          currentPath
        )}%2f${filename}`
      );

      thunkAPI.dispatch(getFileList({ path: currentPath }));
      thunkAPI.dispatch(setMessage(`刪除檔案成功`));
      thunkAPI.dispatch(setSeverity("success"));
      thunkAPI.dispatch(setOpen(true));

      return response.data;
    } catch (e: any) {
      thunkAPI.dispatch(setMessage("刪除檔案失敗"));
      thunkAPI.dispatch(setSeverity("error"));
      thunkAPI.dispatch(setOpen(true));
    }
  }
);

// Create Folder
export const createFolder = createAsyncThunk(
  "file/createFolder",
  async (params: { folderName: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { file: fileState };
      const folderChain = state.file.folderChain;
      const currentPath = folderChain.map((folder) => folder.name).join("/");

      const response = await axiosInstance.post(
        `${Api.backend.files["create-folder"]}`,
        {
          filePath: `${currentPath}/${params.folderName}`,
        }
      );

      thunkAPI.dispatch(getFileList({ path: currentPath }));
      thunkAPI.dispatch(setMessage(`新增資料夾 ${params.folderName} 成功`));
      thunkAPI.dispatch(setSeverity("success"));
      thunkAPI.dispatch(setOpen(true));

      return response.data;
    } catch (e) {
      const error = e as { response: { data: { message: string } } };
      thunkAPI.dispatch(setMessage(error.response.data.message));
      thunkAPI.dispatch(setSeverity("error"));
      thunkAPI.dispatch(setOpen(true));
    }
  }
);

// Upload Files
export const uploadFiles = createAsyncThunk(
  "file/uploadFiles",
  async (params: { files: File[] }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { file: fileState };
      const folderChain = state.file.folderChain;
      const currentPath = folderChain.map((folder) => folder.name).join("/");

      const formData = new FormData();
      formData.append("filePath", `${currentPath}`);
      params.files.forEach((file) => {
        const encodedFileName = encodeURIComponent(file.name);
        const blob = new Blob([file], { type: file.type });
        const newFile = new File([blob], encodedFileName, { type: file.type });
        formData.append("files", newFile);
      });

      const response = await axiosInstance.post(
        Api.backend.files.upload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      thunkAPI.dispatch(getFileList({ path: currentPath }));
      thunkAPI.dispatch(setMessage(`上傳檔案成功`));
      thunkAPI.dispatch(setSeverity("success"));
      thunkAPI.dispatch(setOpen(true));
    } catch (e) {
      const error = e as { response: { data: { message: string } } };
      thunkAPI.dispatch(setMessage(error.response.data.message));
      thunkAPI.dispatch(setSeverity("error"));
      thunkAPI.dispatch(setOpen(true));
    }
  }
);

// Download Files
export const downloadFiles = createAsyncThunk(
  "file/downloadFiles",
  async (params: { filenames: string[] }, thunkAPI) => {
    try {
      const { filenames } = params;

      const state = thunkAPI.getState() as { file: fileState };
      const folderChain = state.file.folderChain;
      const currentPath = folderChain.map((folder) => folder.name).join("/");

      const response = await axiosInstance.post(
        `${Api.backend.files.download}`,
        { filepath: currentPath, filenames: [...filenames] }
      );

      console.log(response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "download.zip");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      thunkAPI.dispatch(setMessage(`下載檔案成功`));
      thunkAPI.dispatch(setSeverity("success"));
      thunkAPI.dispatch(setOpen(true));
    } catch (e) {
      const error = e as { response: { data: { message: string } } };
      thunkAPI.dispatch(setMessage(error.response.data.message));
      thunkAPI.dispatch(setSeverity("error"));
      thunkAPI.dispatch(setOpen(true));
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    // Add Folder Chain
    addFolderChain: (state, action) => {
      state.folderChain.push(action.payload);
    },
    // 上一層
    goBack: (state) => {
      if (state.folderChain.length > 1) {
        state.folderChain.pop();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFileList.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});

export const { addFolderChain, goBack } = fileSlice.actions;

export default fileSlice.reducer;
