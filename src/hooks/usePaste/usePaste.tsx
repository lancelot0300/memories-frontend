import React from "react";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setLastCommand } from "../../state/features/files/filesSlice";
import { FileType, FolderType } from "../../types";
import { refreshCashe, refreshPathAsync } from "../../state/features/path/pathSlice";


function usePaste(setIsOpened: React.Dispatch<React.SetStateAction<boolean>>) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.path);
  const { storageFiles, selectedFiles, lastCommand, cutOrign } = useAppSelector((state) => state.files);

  const selectedElement = selectedFiles.length === 1 && selectedFiles[0].id;

  const handlePasteClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    const url = lastCommand === "copy" ? `${process.env.REACT_APP_API_URL}/copy/foldersandfiles` : lastCommand === "cut" && `${process.env.REACT_APP_API_URL}/cut/foldersandfiles`;

    if(!url) return

    const filesids = storageFiles
      .map((file) => (file as FileType).fileDetails?.id)
      .filter((id) => id);
    const foldersids = storageFiles
      .map((file) => (file as FolderType).folderDetails?.id)
      .filter((id) => id);

    const requset = axiosPrivate.post(
      url,
      {
        filesids,
        foldersids,
        targetFolderId: selectedElement || data.id,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(setLastCommand({ command: "paste" }));
    cutOrign && dispatch(refreshCashe(cutOrign))
    setIsOpened(false);
    await requset
      .then(() => {
        dispatch(refreshPathAsync(data.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { handlePasteClick, storageFiles, selectedFiles };
}

export default usePaste;
