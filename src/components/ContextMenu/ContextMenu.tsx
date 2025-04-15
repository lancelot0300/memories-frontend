import { forwardRef, useImperativeHandle } from "react";
import CreateModal from "../CreateModal/CreateModal";
import { ContextWrapper } from "../FileElement/fileElement.styles";
import DeleteContextOption from "../ContextComponents/DeleteContextOption/DeleteContextOption";
import CopyContextOption from "../ContextComponents/CopyContextOption/CopyContextOption";
import DownloadContextOption from "../ContextComponents/DownloadContextOption/DownloadContextOption";
import useContext from "../../hooks/useContext/useContext";
import CreateFolderOption from "../ContextComponents/CreateFolderOption/CreateFolderOption";
import PasteContextOption from "../ContextComponents/PasteContextOption/PasteContextOption";
import UploadContextOption from "../ContextComponents/UploadContextOption/UploadContextOption";
import OpenContextOption from "../ContextComponents/OpenContextOption/OpenContextOption";
import PreviewContextOption from "../ContextComponents/PreviewContextOption/PreviewContextOption";
import RenameContextOption from "../ContextComponents/RenameContextOption/RenameContextOption";
import { InfoTextRef } from "../../types";
import { isMobileDevice } from "../../utils/homeUtils";
import InfoContextOption from "../ContextComponents/InfoContextOption/InfoContextOption";
import CutContextOption from "../ContextComponents/CutContextOption/CutContextOption";
import AddToFavOption from "../ContextComponents/AddToFavOption/AddToFavOption";

type Props = {
  element: "Home" | "Folder" | "File";
  infoTextRef?: React.RefObject<InfoTextRef>;
  fileElementRef?: React.RefObject<HTMLDivElement>;
};

const ContextMenu = forwardRef(
  ({ element, infoTextRef, fileElementRef }: Props, ref) => {
    const {
      handleOpenContext,
      isOpenedContext,
      posY,
      posX,
      setIsOpenedContex,
      contextMenuRefs,
    } = useContext();

    useImperativeHandle(ref, () => ({
      handleOpenContext,
    }));

    const optionsConfig = {
      Home: [PasteContextOption, CreateFolderOption, UploadContextOption],
      Folder: [
        OpenContextOption,
        RenameContextOption,
        DownloadContextOption,
        CopyContextOption,
        CutContextOption,
        PasteContextOption,
        DeleteContextOption,
        AddToFavOption,
      ],
      File: [
        PreviewContextOption,
        RenameContextOption,
        DownloadContextOption,
        CopyContextOption,
        CutContextOption,
        DeleteContextOption,
        AddToFavOption,
      ],
    };

    const options = optionsConfig[element];

    if (!isOpenedContext) return null;

    return (
      <>
        <CreateModal
          isOpened={isOpenedContext}
          setIsOpened={setIsOpenedContex}
          withoutOverlay
        >
          <ContextWrapper
            $posX={posX.current}
            $posY={posY.current}
            ref={contextMenuRefs}
          >
            {options.map((OptionComponent, index) => (
              <OptionComponent
                key={index}
                setIsOpenedContext={setIsOpenedContex}
              />
            ))}
            {isMobileDevice() && element !== "Home" && (
              <InfoContextOption
                infoTextRef={infoTextRef}
                fileElementRef={fileElementRef}
                setIsOpened={setIsOpenedContex}
                setIsOpenedContext={setIsOpenedContex}
              />
            )}
          </ContextWrapper>
        </CreateModal>
      </>
    );
  }
);

export default ContextMenu;
