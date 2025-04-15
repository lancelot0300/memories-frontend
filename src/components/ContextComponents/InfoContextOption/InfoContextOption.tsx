import React from 'react'
import { ContextOption } from '../../FileElement/fileElement.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InfoTextRef } from '../../../types';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

type Props = {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>
    infoTextRef? : React.RefObject<InfoTextRef>;
    fileElementRef?: React.RefObject<HTMLDivElement>;
  }
function InfoContextOption({fileElementRef, infoTextRef,setIsOpened}: Props) {

    const handleClick = () => {
        if(!fileElementRef?.current || !infoTextRef?.current) return;
        if (fileElementRef.current) infoTextRef.current?.showInfo(fileElementRef.current);
        setIsOpened(false)
    }

    
    return (
        <ContextOption onClick={handleClick}><FontAwesomeIcon icon={faCircleInfo} />  <span>Info</span></ContextOption>
      )
}

export default InfoContextOption