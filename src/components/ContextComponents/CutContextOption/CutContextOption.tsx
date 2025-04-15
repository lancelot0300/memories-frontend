import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScissors } from '@fortawesome/free-solid-svg-icons'
import { setLastCommand } from '../../../state/features/files/filesSlice'
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { getActualPath } from '../../../state/features/path/pathSlice'

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>
}


function CutContextOption({setIsOpenedContext}: Props) {

    
  const { selectedFiles } = useAppSelector((state) => state.files);
  const path = useAppSelector((state) => getActualPath(state.path));
  const dispatch = useAppDispatch();

  
  const handleCutClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsOpenedContext && setIsOpenedContext(false);
    if(selectedFiles.length === 0) return
    dispatch(setLastCommand({files: selectedFiles, command: "cut", cutOrign: path.id}))
}


    return (
      <ContextOption onClick={handleCutClick}><FontAwesomeIcon icon={faScissors} /> <span>Cut</span></ContextOption>
    )
}

export default CutContextOption