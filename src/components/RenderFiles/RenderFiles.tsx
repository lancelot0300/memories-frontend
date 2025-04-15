import React from "react";
import { ActiveFiles, FileType,  Response } from "../../types";
import FileElement from "../FileElement/FileElement";

type Props = {
  data: Response;
  allFilesRefs: React.MutableRefObject<ActiveFiles[]>;
  clearDrag: () => void;
};

const RenderFiles = ({ data, allFilesRefs, clearDrag }: Props) => {
  if (!data) return null;


  const sortedFiles = [...(data.files || [])].sort((a: FileType, b: FileType) => {
    return (b.fileDetails.isStared ? 1 : 0) - (a.fileDetails.isStared ? 1 : 0);
  });
  


  return (
    <>
      {sortedFiles.map((item: FileType, index: number) => {
        return (
          <FileElement
          key={item.id}
          clearDrag={clearDrag}
          element={item}
          ref={(el) => {
            if (!el) return;
            if(allFilesRefs.current.some((file) => file.item.id === item.id)) {
              const index = allFilesRefs.current.findIndex((file) => file.item.id === item.id);
              return allFilesRefs.current[index] = el;
             }
            allFilesRefs.current.push(el);
          }}
          />
        );
      })}
    </>
  );
};

export default RenderFiles;
