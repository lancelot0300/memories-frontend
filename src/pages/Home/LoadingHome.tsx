import React from "react";
import Menu from "../../components/Menu/Menu";
import { FolderGridContainer, HomeContainer } from "./home.styles";
import LoadingFileElement from "../../components/FileElement/LoadingFileElement";
import { ActiveFiles } from "../../types";

function LoadingHome({withMenu}: {withMenu?: boolean}) {

  const allFilesRefs = React.useRef<ActiveFiles[]>([]);


  return (
    <>
       {withMenu  && <Menu allFilesRefs={allFilesRefs} />}
      <HomeContainer>
        <FolderGridContainer>
                <LoadingFileElement />
        </FolderGridContainer>
      </HomeContainer>
    </>
  );
}

export default LoadingHome;
