import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { addFileStatus, updateFileStatus } from "../../state/features/requests/requestsSlice";
import CreateModal from "../../components/CreateModal/CreateModal";
import {
  UploadCustomButton,
  UploadFormButton,
  UploadFormInput,
  UploadFormTitle,
  UploadModal,
} from "./useUpload.styles";
import { refreshPathAsync } from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { addController, removeController } from "../../utils/abortControlerMap";

function useUpload(setIsOpened?: (value: boolean) => void) {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { data } = useAppSelector((state) => state.path);
  const axiosPrivate = useAxiosPrivate();
  const apiUrl = `${process.env.REACT_APP_API_URL}/file/chunk`;

  const uploadFilesAsChunks = async (files: FileList | null) => {
    if (!files) return alert("Select a file to upload");

    const uploadPromises = Array.from(files).map((file) => uploadFile(file));
    try {
      await Promise.all(uploadPromises);
      dispatch(refreshPathAsync(data.id));
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const uploadFile = async (file: File) => {
    const chunkSize = 1024 * 1024;
    const numberOfChunks = Math.ceil(file.size / chunkSize);
    const fileId = crypto.randomUUID();
    const controller = new AbortController();
    addController(fileId, controller);
  
    dispatch(addFileStatus({ index: fileId, fileName: file.name, progress: "0%", status: "Uploading" }));
  
    try {
      for (let chunkIndex = 0; chunkIndex < numberOfChunks; chunkIndex++) {
        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
  
        if (controller.signal.aborted) {
          break; 
        }
  
        await uploadChunk(file, fileId, controller, start, end, chunkIndex, numberOfChunks);
      }
  
      if (!controller.signal.aborted) {
        dispatch(updateFileStatus({ index: fileId, progress: "100%", status: "Uploaded" }));
      }
    } catch (error) {
      dispatch(updateFileStatus({ index: fileId, progress: "Failed", status: "Error" }));
      throw error;
    } finally {
      removeController(fileId); 
    }
  };
  

  const uploadChunk = async (
    file: File,
    fileId: string,
    controller: AbortController,
    start: number,
    end: number,
    chunkIndex: number,
    totalChunks: number
  ) => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    formData.append("fileData", chunk);
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("fileName", file.name);
    formData.append("fileId", fileId);
    formData.append("folderId", data.id);

    await retryRequest(async () => {
      await axiosPrivate.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        signal: controller.signal,
        timeout: 15000,
        onUploadProgress: (progressEvent) => {
          if (progressEvent?.total) {
            const progress = ((chunkIndex + progressEvent.loaded / progressEvent.total) / totalChunks) * 100;
            dispatch(updateFileStatus({ index: fileId, progress: `${progress.toFixed(0)}%`, status: "Uploading" }));
          }
        },
      });
    });
  };

  const retryRequest = async (requestFn: () => Promise<void>, retries = 2) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await requestFn();
        return;
      } catch (error) {
        if (attempt === retries) throw error;
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setFiles(event.target.files);
  const handleCloseClick = () => {
    setIsOpenedModal(false);
    setIsOpened?.(false);
  };
  const handleUploadClick = async () => {
    if (files) {
      await uploadFilesAsChunks(files); 
      handleCloseClick();
    } else {
      alert("Select a file to upload");
    }
  };
    const handleCustomButtonClick = () => inputRef.current?.click();

  useEffect(() => {
    if (!isOpenedModal) setFiles(null);
  }, [isOpenedModal]);

  const createModal = () =>
    isOpenedModal ? (
      <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
        <UploadModal>
          <UploadFormTitle>Upload File</UploadFormTitle>
          <UploadCustomButton onClick={handleCustomButtonClick}>Choose File</UploadCustomButton>
          <UploadFormInput ref={inputRef} type="file" multiple onChange={handleInputChange} onClick={(e) => e.stopPropagation()} />
          {files && <b>{files.length} file(s) selected</b>}
          <UploadFormButton type="button" onClick={handleUploadClick}>Upload</UploadFormButton>
        </UploadModal>
      </CreateModal>
    ) : null;

  return { createModal, setIsOpenedModal, uploadFilesAsChunks };
}

export default useUpload;
