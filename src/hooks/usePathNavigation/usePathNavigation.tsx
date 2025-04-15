import React from 'react'
import { isNextPathInHistory, setActualPathAndFetchAsync } from '../../state/features/path/pathSlice';
import { useAppDispatch, useAppSelector } from '../../state/store';
import {  useNavigate} from 'react-router-dom';
import { ActiveFiles } from '../../types';

function usePathNavigation(allFilesRefs?: React.MutableRefObject<ActiveFiles[]>) {
    const { actualPath, history } = useAppSelector((state) => state.path);
    const isNextPath = useAppSelector((state) => isNextPathInHistory(state.path));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isPreviousPath = actualPath.length > 1;
  
    const handlePathChange = (pathIndex: number) => {
      if(allFilesRefs)
      {
        allFilesRefs.current = [];
      }
      dispatch(setActualPathAndFetchAsync(pathIndex));
      history[pathIndex].name === null
        ? navigate("/", { replace: true })
        : navigate(`/${history[pathIndex].id}`, { replace: true });
    };
  
    const setPreviousPath = (pathIndex: number) => {
      if (pathIndex < 0) return;
      dispatch(setActualPathAndFetchAsync(pathIndex));
      history[pathIndex].name === null
        ? navigate("/", { replace: true })
        : navigate(`/${history[pathIndex].id}`, { replace: true });
    };
  
    const setNextPath = (pathIndex: number) => {
        
      if (!isNextPath) return;
      dispatch(setActualPathAndFetchAsync(pathIndex));
      navigate(`/${history[pathIndex].id}`, { replace: true });
    };


    return {setNextPath, setPreviousPath, handlePathChange, isPreviousPath, actualPath, isNextPath}
}

export default usePathNavigation