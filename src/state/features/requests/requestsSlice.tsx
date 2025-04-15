import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FileStatusState = {
  index: string;
  fileName: string;
  progress: string;
  status: "Uploading" | "Error"  | "Downloading" | "Downloaded" | "Uploaded" | "Canceled";
};

type UpdateStateType = {
  index: string;
  progress: string;
  status: "Uploading" | "Error"  | "Downloading" | "Downloaded" | "Uploaded" | "Canceled";
};

type InitialState = {
  activeRequests: FileStatusState[];
};

const initialState: InitialState = {
  activeRequests: [],
};

const activeRequests = createSlice({
  name: "activeRequests",
  initialState,
  reducers: {
    addFileStatus: (state, action: PayloadAction<FileStatusState>) => {
      const { index, fileName, status } = action.payload;
      state.activeRequests.push({
        index: index,
        fileName,
        progress: "0%",
        status,
      });

      if(state.activeRequests.length > 8 && state.activeRequests[0].progress === "100%") {
        state.activeRequests.shift();
      }

    },
    removeFileStatus: (state, action: PayloadAction<string>) => {
      state.activeRequests = state.activeRequests.filter((file) => file.index !== action.payload);
    },
    updateFileStatus: (state, action: PayloadAction<UpdateStateType>) => {
      state.activeRequests = state.activeRequests.map((file) => {
        if (file.index === action.payload.index) {
          return {
            ...file,
            progress: action.payload.progress,
            status: action.payload.status
          };
        }
        return file;
      });
    },
    clearAllFilesStatus: (state) => {
      state.activeRequests = [];
    }
   
  },
});

export const getActualElement = (state: InitialState, index: string) => state.activeRequests.find((file) => file.index === index);


export default activeRequests.reducer;
export const { addFileStatus, removeFileStatus, updateFileStatus, clearAllFilesStatus } = activeRequests.actions;
