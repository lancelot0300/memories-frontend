import { useAppDispatch, useAppSelector } from '../../../state/store';
import { isFolderSelected } from '../../../utils/homeUtils';
import { ContextOption } from '../../FileElement/fileElement.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { clearFiles } from '../../../state/features/files/filesSlice';
import { FolderType } from '../../../types';
import { setNewPathAndFetchAsync } from '../../../state/features/path/pathSlice';
import { useNavigate } from 'react-router-dom';

function OpenContextOption() {

  const dispatch = useAppDispatch();
  const { selectedFiles } = useAppSelector((state) => state.files);
  const navigate = useNavigate();

  if(isFolderSelected(selectedFiles)) return null

  const handleOpenClick = () => {
    const folder =  "folderDetails" in selectedFiles[0] && selectedFiles[0] as FolderType;
    if(!folder ) return
    dispatch(setNewPathAndFetchAsync({id: selectedFiles[0].id, name: folder.folderDetails.name}));
    dispatch(clearFiles());
    navigate(`/${selectedFiles[0].id}`, { replace: true });
  }

  return (
    <ContextOption onClick={handleOpenClick}><FontAwesomeIcon icon={faDoorOpen} />  <span>Open</span></ContextOption>
  )
}

export default OpenContextOption