import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "./fileElement.styles";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoadingFileElement() {
  return (
    <>
      <LoadingIcon>
        <FontAwesomeIcon size="4x" icon={faSpinner} />
      </LoadingIcon>
    </>
  );
}

export default LoadingFileElement;
