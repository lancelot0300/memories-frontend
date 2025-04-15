import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ActiveFiles, ContextRef, FolderType } from "../../types";
import { FolderElementContainer, Icon, Name, StarIcon } from "./folderElement.styles";
import { useAppDispatch } from "../../state/store";
import ContextMenu from "../ContextMenu/ContextMenu";
import { faFolder, faStar } from "@fortawesome/free-solid-svg-icons";
import useFile from "../../hooks/useFile/useFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setNewPathAndFetchAsync } from "../../state/features/path/pathSlice";
import InfoText from "../InfoText/InfoText";
import { InfoElement } from "../InfoText/infoText.styles";
import { getDateString, isMobileDevice } from "../../utils/homeUtils";
import { clearFiles } from "../../state/features/files/filesSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  element: FolderType;
  clearDrag: () => void;
}

const FolderElement = forwardRef<ActiveFiles | null, IProps>(
  ({ element, clearDrag }, ref) => {
    const {
      setActiveElement,
      isActive,
      isCopy,
      setActiveOnRightClick,
      selectedFiles,
    } = useFile({ element });
    const fileElementRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<ContextRef>();
    const infoTextRef = useRef<any>(null);
    const lastTimeClick = useRef(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
      element: fileElementRef.current as HTMLDivElement,
      item: element,
    }));

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      if (!element.folderDetails) return;
      dispatch(
        setNewPathAndFetchAsync({
          id: element.folderDetails.id,
          name: element.folderDetails.name,
        })
      );
      dispatch(clearFiles());
      navigate(`/${selectedFiles[0].id}`, { replace: true });
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      if (isMobileDevice()) {
        handleRightClick(event);
      } else {
        const clickTime = new Date().getTime();
        const timeSinceLastClick = clickTime - lastTimeClick.current;

        if (timeSinceLastClick < 300) {
          return handleDoubleClick(event);
        }

        lastTimeClick.current = clickTime;
        setActiveElement(event);
      }
    };

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      clearDrag();
      setActiveOnRightClick();
      contextMenuRef.current?.handleOpenContext(e, true);
    };

    return (
      <>
        <FolderElementContainer
          ref={fileElementRef}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          $isSelected={isActive}
          $isCopy={isCopy}
          onMouseEnter={() => {
            if (isMobileDevice()) return;
            infoTextRef.current?.showInfo(fileElementRef.current);
          }}
          onMouseLeave={() => infoTextRef.current?.hideInfo()}
        >
          <Icon>
            <FontAwesomeIcon size="3x" color="#8ec8f3" icon={faFolder} />
          </Icon>
          <Name>{element.folderDetails.name}</Name>
          {element.folderDetails.isStared && <StarIcon><FontAwesomeIcon icon={faStar} /></StarIcon>}
          <InfoText ref={infoTextRef}>
            <InfoElement>Name: {element.folderDetails.name}</InfoElement>
            <InfoElement>
              Created:{" "}
              {getDateString(element.folderDetails.createdDate) + " UTC"}
            </InfoElement>
          </InfoText>
        </FolderElementContainer>
        <ContextMenu
          element="Folder"
          ref={contextMenuRef}
          infoTextRef={infoTextRef}
          fileElementRef={fileElementRef}
        />
      </>
    );
  }
);

export default FolderElement;
