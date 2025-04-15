import React from 'react'
import useDelete from '../../../hooks/useDelete/useDelete'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteContextOption({setIsOpenedContext}: Props) {
    const {handleDeleteClick} = useDelete(setIsOpenedContext)

    return (
      <ContextOption onClick={handleDeleteClick}><FontAwesomeIcon icon={faTrash} size='1x' /><span>Delete</span></ContextOption>
    )
}

export default DeleteContextOption