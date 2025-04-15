import React, { useEffect } from "react";
import {
  LeftWrapper,
  RightWrapper,
  StatusFile,
  StatusFileName,
  StatusWrapper,
} from "./statuses.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  getActualElement,
  removeFileStatus,
  updateFileStatus,
} from "../../state/features/requests/requestsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate/useAxiosPrivate";
import { abortController } from "../../utils/abortControlerMap";

type Props = {
  request: {
    fileName: string;
    progress: string;
    index: string;
  };
};

function Status({ request }: Props) {
  const actualStatus = useAppSelector((state) =>
    getActualElement(state.activeRequests, request.index)
  );
  const dispatch = useAppDispatch();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    if (!actualStatus) return;
    if (["Uploaded", "Downloaded", "Error"].includes(actualStatus.status)) {
      setTimeout(() => {
        dispatch(removeFileStatus(request.index));
      }, 12000);
    }
  }, [actualStatus, dispatch, request.index]);

  const handleCloseClick = (e :React.MouseEvent<SVGSVGElement>, index: string) => {
    e.stopPropagation()
    abortController(request.index);
    dispatch(
      updateFileStatus({
        index: request.index,
        progress: "Canceled",
        status: "Canceled",
      })
    );
    dispatch(removeFileStatus(index));
  };

  return (
    <StatusWrapper $status={actualStatus?.status} ref={wrapperRef}>
      <LeftWrapper>
        <StatusFile>{actualStatus?.status}:</StatusFile>
        <StatusFileName>{request.fileName}</StatusFileName>
      </LeftWrapper>
      <RightWrapper>
        <p>{actualStatus?.progress}</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={(e) => handleCloseClick(e, request.index)}
          style={{ cursor: "pointer" }}
        />
      </RightWrapper>
    </StatusWrapper>
  );
}

export default Status;
