import React from "react";
import { ContextOption } from "../../FileElement/fileElement.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate/useAxiosPrivate";
import { refreshPathAsync } from "../../../state/features/path/pathSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { addController, removeController, abortController, getController } from "../../../utils/abortControlerMap";
import { AxiosError } from "axios";

type Props = {
  setIsOpenedContext: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddToFavOption({ setIsOpenedContext }: Props) {
  const { data } = useAppSelector((state) => state.path);
  const { selectedFiles } = useAppSelector((state) => state.files);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const isFile = "fileDetails" in selectedFiles[0];
    const isFolder = "folderDetails" in selectedFiles[0];
    const favouriteID = "favourite-" + selectedFiles[0].id;

    const isController = getController(favouriteID);
    if (isController) {
      return setIsOpenedContext(false);
    }

    // Create a new AbortController and add it to the map
    const controller = new AbortController();
    addController(favouriteID, controller);

    setIsOpenedContext(false);

    const url = isFile ? "/file" : isFolder ? "/folder" : "";
    if (!url) return;

    try {
      await axiosPrivate.patch(
        process.env.REACT_APP_API_URL + url + "/star/" + selectedFiles[0].id,
        { withCredentials: true },
        { signal: controller.signal } // Pass the signal to axios
      );
    } catch (e) {
      const error = e as AxiosError;
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error(error);
      }
    } finally {
      // Refresh path and clean up the controller
      dispatch(refreshPathAsync(data.id));
      removeController(favouriteID);
    }
  };

  if (selectedFiles.length > 1) return null;

  return (

    <ContextOption onClick={onSubmit}>
      <FontAwesomeIcon icon={faStar} />
      <span>Favourite</span>
    </ContextOption>
  );
}

export default AddToFavOption;
