import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { setLastCommand } from '../../../state/features/files/filesSlice'
import { useAppDispatch, useAppSelector } from '../../../state/store'

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>
}


function CopyContextOption({setIsOpenedContext}: Props) {

  
  const { selectedFiles } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  
  const handleCopyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpenedContext && setIsOpenedContext(false);
    if(selectedFiles.length === 0) return
    dispatch(setLastCommand({files: selectedFiles, command: "copy"}))
}


    return (
      <ContextOption onClick={handleCopyClick}><FontAwesomeIcon icon={faCopy} />  <span>Copy</span></ContextOption>
    )
}

export default CopyContextOption
