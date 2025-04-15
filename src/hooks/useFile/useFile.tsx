import React from 'react'
import { useAppDispatch, useAppSelector } from "../../state/store"
import { addFile, removeFile, selectFiles } from '../../state/features/files/filesSlice';
import { FileType, FolderType } from '../../types';

type Props = {
    element: FileType | FolderType,
}

function useFile({element}: Props) {

  const { selectedFiles } = useAppSelector(
    (state) => state.files,
    (prev, next) => {
      const wasSelected = prev.selectedFiles.some(
        (el) => el.id === element.id
      );
      const isSelected = next.selectedFiles.some(
        (el) => el.id === element.id
      );
      return wasSelected === isSelected;
    }
  );

  const { storageFiles, lastCommand } = useAppSelector(
    (state) => state.files,
    (prev, next) => {
      const wasSelected = prev.storageFiles.some(
        (el) => el.id === element.id
      );
      const isSelected = next.storageFiles.some((el) => el.id === element.id);
      return wasSelected === isSelected;
    }
  );

    const isActive = selectedFiles.some((el) => el.id === element.id);
    const isCopy = storageFiles.some((el) => el.id === element.id) && ["copy", "cut"].includes(lastCommand)
    
    const dispatch = useAppDispatch();

    const selectSingleElement = () => {
          dispatch(selectFiles([element]));
      };
  
      const selectMultipleElements = () => {
        if (isActive) {
          dispatch(removeFile(element));
        } else {
          dispatch(addFile(element));
        }
      };
  
      const setActiveElement = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
          selectMultipleElements();
        } else {
          selectSingleElement();
        }
      };

      const setActiveOnRightClick = () => {
        if (!isActive) {
          selectSingleElement();
        }
      };

      return { setActiveElement, isActive, isCopy, setActiveOnRightClick, selectedFiles}
}

export default useFile