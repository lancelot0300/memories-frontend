import React from "react";
import useRename from "../../../hooks/useRename/useRename";
import { ContextOption } from "../../FileElement/fileElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>;
};

function RenameContextOption({ setIsOpenedContext }: Props) {
  const { createModal,  selectedFiles, handleOpenClick } =
    useRename(setIsOpenedContext);


  if (selectedFiles.length > 1) return null;

  return (
    <>
      <ContextOption onClick={handleOpenClick}>
        <FontAwesomeIcon icon={faPenToSquare} />
        <span>Rename</span>
      </ContextOption>
      {createModal()}
    </>
  );
}

export default RenameContextOption;
