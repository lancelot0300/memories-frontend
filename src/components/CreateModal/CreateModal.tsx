import React from "react";
import { createPortal } from "react-dom";
import { Overlay, PortalBody } from "./createModal.styles";

type CreateModalProps = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  withoutOverlay?: boolean;
};

function CreateModal({
  isOpened,
  setIsOpened,
  withoutOverlay,
  children,
}: CreateModalProps) {
  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    setIsOpened(false);
  };

  if (!isOpened) return null;

  return createPortal(
    <>
      <Overlay $wihoutOverlay={withoutOverlay} onClick={handleClickOutside} />
      <PortalBody onClick={(e) => e.stopPropagation()}>{children}</PortalBody>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
}

export default CreateModal;
