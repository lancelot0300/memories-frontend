
import { useState } from "react";
import CreateModal from "../../components/CreateModal/CreateModal";
import { useAppDispatch, useAppSelector } from "../../state/store"
import * as yup from "yup";
import { useFormik } from "formik";
import { InputWrapper, StyledField } from "../../pages/Login/login.styles";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { refreshPathAsync } from "../../state/features/path/pathSlice";
import useAxiosPrivate from "../useAxiosPrivate/useAxiosPrivate";
import { UploadFormButton, UploadModal } from "./useCreateFolder.styles";

type IFolderFormValues = {
  folder: string;
}

function useCreateFolder(setIsOpened: (value: boolean) => void) {

    const { data } = useAppSelector((state) => state.path);
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const dispatch = useAppDispatch();
    const axiosPrivate = useAxiosPrivate();

    const schema = yup.object().shape({
      folder: yup.string().required("Folder name is required"),
    });
  

    const handleCloseClick = () => {
      setIsOpenedModal(false);
      setIsOpened(false);
    }

    const onSubmit = async ( {folder } : IFolderFormValues) => {
      const cleanedFolderName = folder.trim();

      if(data.childFolders?.some((child) => child.folderDetails.name === cleanedFolderName)) {
        setErrors({folder: "Folder with this name already exists"})
        return;
      }

      try {
        await axiosPrivate.post(
          process.env.REACT_APP_API_URL + "/folder",
          {
            parentFolderId: data.id,
            folderDetails: {
              Name: cleanedFolderName,
            },
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error(error);
      }
      dispatch(refreshPathAsync(data.id));
    }

    const {
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setErrors,
    } = useFormik<{folder: string}>({
      initialValues: {
        folder: "",
      },
      onSubmit,
      validationSchema: schema,
    });

    const createModal = () => {
      if(!isOpenedModal) return null
      
      return (
        <CreateModal isOpened={isOpenedModal} setIsOpened={handleCloseClick}>
        <UploadModal>
        <form onClick={e => e.stopPropagation()} onSubmit={handleSubmit} title="Folder">
          <InputWrapper>
            <StyledField id="folder" name="folder" autoComplete="folder" placeholder="Folder name" value={values.folder} onChange={handleChange} $isError={!!errors.folder}/>
            <ErrorMessage $isError={!!errors.folder} >
              {touched.folder && errors.folder ? errors.folder : ""}
            </ErrorMessage>
          </InputWrapper>
          <UploadFormButton type="submit">
            Create
          </UploadFormButton>
        </form>
        </UploadModal>
      </CreateModal>
      )
    }

    return {setIsOpenedModal, createModal}

}

export default useCreateFolder