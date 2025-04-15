import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { ContextOption } from "../../FileElement/fileElement.styles";
import useCreateFolder from "../../../hooks/useCreateFolder/useCreateFolder";

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateFolderOption({setIsOpenedContext}: Props) {

  const {createModal, setIsOpenedModal, } = useCreateFolder(setIsOpenedContext);

  const handleOptionClick = () => {
    setIsOpenedModal(true);
  }

  return (
    <>
        <ContextOption onClick={handleOptionClick}><FontAwesomeIcon icon={faFolderPlus} size='1x' /><span>Create Folder</span></ContextOption>
        {createModal()}
    </>
  );
}

export default CreateFolderOption;
