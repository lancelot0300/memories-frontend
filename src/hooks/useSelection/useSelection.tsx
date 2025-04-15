import React, { useEffect, useRef } from "react";
import { ActiveFiles, Response } from "../../types";
import { useAppDispatch } from "../../state/store";
import { addFiles, selectFiles } from "../../state/features/files/filesSlice";
import { isClickedContainer } from "../../utils/homeUtils";

type Props = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  data: Response;
};

function useSelection({ containerRef, data }: Props) {
  const dispatch = useAppDispatch();
  const allFilesRefs = useRef<ActiveFiles[]>([]);
  
  useEffect(() => {
    allFilesRefs.current = [];
  }, [data.childFolders, data.files]);

  const draggingRef = useRef(false);
  let { current: isClickedFlag } = useRef(false);
  let { current: startPos } = useRef<{ x: number; y: number } | null>(null);
  let { current: endPos } = useRef<{ x: number; y: number } | null>(null);
  let { current: selectDiv } = useRef<HTMLDivElement | null>(null);

  const { current: allFiles } = allFilesRefs;
  let { current: dragging } = draggingRef;

  const createSelection = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const div = selectDiv || document.createElement("div");
    const style = div.style;

    style.display = "block";
    style.width = `${width}px`;
    style.height = `${height}px`;
    style.position = "absolute";
    style.top = `${y}px`;
    style.left = `${x}px`;
    style.border = "1px solid black";
    style.backgroundColor = "rgba(255,255,255,0.05)";
    style.zIndex = "1";

    if (!selectDiv) {
      containerRef.current?.appendChild(div);
      selectDiv = div;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedContainer(containerRef, e) || e.button !== 0 || dragging) return;

    startPos = { x: e.pageX, y: e.pageY };
    endPos = { x: e.pageX, y: e.pageY };

    isClickedFlag = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedFlag || !startPos) return;
    
    dragging = true;
    endPos = { x: e.pageX, y: e.pageY };

    if (startPos.x > endPos.x) endPos.x += 1;
    if (startPos.y > endPos.y) endPos.y += 1;

    if (endPos.x > window.innerWidth - 10) endPos.x = window.innerWidth - 10;
    if (endPos.y > window.innerHeight + window.scrollY)
      endPos.y = window.innerHeight + window.scrollY - 10;

    const selectedItems = allFiles.filter((el) => {
      if (!el || !el.element) return false;
      if (!startPos || !endPos) return false;
      const rect = el.element.getBoundingClientRect();
      return (
        rect.x <
          Math.max(startPos.x - window.scrollX, endPos.x - window.scrollX) &&
        rect.x + rect.width >
          Math.min(startPos.x - window.scrollX, endPos.x - window.scrollX) &&
        rect.y <
          Math.max(startPos.y - window.scrollY, endPos.y - window.scrollY) &&
        rect.y + rect.height >
          Math.min(startPos.y - window.scrollY, endPos.y - window.scrollY)
      );
    });

    selectedItems.forEach((el) => {
      if (el?.element) {
        el.element.classList.add("hoverActive");
      }
    });

    allFiles.forEach((el) => {
      if (el?.element && !selectedItems.includes(el)) {
        el.element.classList.remove("hoverActive");
      }
    });

    createSelection(
      Math.min(startPos.x, endPos.x),
      Math.min(startPos.y, endPos.y),
      Math.abs(startPos.x - endPos.x),
      Math.abs(startPos.y - endPos.y)
    );
  };

  const clearDrag = () => {
    allFiles.forEach((el) => {
      if (el?.element) {
        el.element.classList.remove("hoverActive");
      }
    });

    dragging = false;
    isClickedFlag = false;
    selectDiv?.remove();
    selectDiv = null;
  };

  const handleClick = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (!isClickedContainer(containerRef, e)) return;
    if (!dragging && !isClickedFlag) return;
    clearDrag();

    const selectedItems: ActiveFiles[] = allFiles.filter((el) => {
      if (!el || !el.element) return false;
      if (!startPos || !endPos) return false;
      const rect = el.element.getBoundingClientRect();
      return (
        rect.x <
          Math.max(startPos.x - window.scrollX, endPos.x - window.scrollX) &&
        rect.x + rect.width >
          Math.min(startPos.x - window.scrollX, endPos.x - window.scrollX) &&
        rect.y <
          Math.max(startPos.y - window.scrollY, endPos.y - window.scrollY) &&
        rect.y + rect.height >
          Math.min(startPos.y - window.scrollY, endPos.y - window.scrollY)
      );
    });


    if (e?.ctrlKey) {
      return dispatch(addFiles(selectedItems.map((el) => el.item)));
    }
    dispatch(selectFiles(selectedItems.map((el) => el.item)));
  };

  const handleMouseLeave = () => {
    if (!isClickedFlag || !dragging) return;
    window.addEventListener("mouseup", () => handleClick(), { once: true });
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseLeave,
    handleClick,
    draggingRef,
    allFilesRefs,
    clearDrag,
  };
}

export default useSelection;
