import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import {
  addFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import { addController, removeController } from "../../utils/abortControlerMap";

function useDownload(
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { selectedFiles } = useAppSelector((state) => state.files);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const handleDownloadClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    try {
      for (const file of selectedFiles) {
        const isFile = "fileDetails" in file;
        const isFolder = "folderDetails" in file

        const FileOrFolder = isFile ? file.fileDetails : isFolder ? file.folderDetails : null;

        if (!FileOrFolder) continue;

        const uuid = crypto.randomUUID();

        const fileUrl = `${process.env.REACT_APP_API_URL}/file/download/${FileOrFolder.id}`
        const folderUrl = `${process.env.REACT_APP_API_URL}/folder/download/${FileOrFolder.id}`
        const url = isFile ? fileUrl : isFolder ? folderUrl : null
        if (!url) return

        const controller = new AbortController();
        addController(uuid, controller);
    

        dispatch(
          addFileStatus({
            index: uuid,
            fileName: FileOrFolder.name,
            progress: "0%",
            status: "Downloading",
          })
        );

        try {
          const response = await axiosPrivate.get(url, {
            withCredentials: true,
            responseType: "blob",
            signal: controller.signal,
            onDownloadProgress(progressEvent) {
              if (progressEvent.progress) {
                dispatch(
                  updateFileStatus({
                    index: uuid,
                    progress: `${(progressEvent.progress * 100).toFixed(0)}%`,
                    status:
                      progressEvent.progress >= 1 ? "Downloaded" : "Downloading",
                  })
                );
              }
            },
          });

          const downloadUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );
          const link = document.createElement("a");
          link.href = downloadUrl;

          const fileName = FileOrFolder.name
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          dispatch(
            updateFileStatus({
              index: FileOrFolder.id,
              progress: "Failed",
              status: "Error",
            })
          );
        }
        finally {
          removeController(uuid);
        }
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      if (setIsOpened) {
        setIsOpened(false);
      }
    }
  };


  return { handleDownloadClick };
}

export default useDownload;
