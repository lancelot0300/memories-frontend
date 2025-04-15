import {  useAppSelector } from '../../../state/store';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FileType } from '../../../types';
import usePreview from '../../../hooks/usePreview/usePreview';

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>
}

function PreviewContextOption({ setIsOpenedContext }: Props) {
  const selectedFiles = useAppSelector((state) => state.files.selectedFiles);
  const {renderPreview, handleOpen, canBePreview} = usePreview({setIsOpenedContext, selectedFiles});


  if(selectedFiles.length === 0 || selectedFiles.length > 1) return null

  if(!canBePreview(selectedFiles[0] as FileType)) return null

  return (
    <>
      <ContextOption onClick={ () => handleOpen(true)}><FontAwesomeIcon icon={faEye} />  <span>Preview</span></ContextOption>
      {renderPreview()}
    </>
  )
}

export default PreviewContextOption