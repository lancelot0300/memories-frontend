import React, { useEffect } from 'react';
import useUpload from '../useUpload/useUpload';

type HookProps = {
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

function useDropHook({ containerRef }: HookProps) {
    const { uploadFilesAsChunks } = useUpload();

    const ifNotFiles = (e: DragEvent) => {
        return !e.dataTransfer?.types.includes("Files");
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();

            if(ifNotFiles(e)) return;


            if (containerRef.current) {
                containerRef.current.classList.add("dragging");
            }
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation()
            if(ifNotFiles(e)) return;

            if (containerRef.current) {
                containerRef.current.classList.remove("dragging");
            }

            if (!e.dataTransfer) {
                console.error("No dataTransfer");
                return;
            }

            const files = e.dataTransfer.files;
            if (files.length === 0) {
                console.error("No files dropped.");
                return;
            }

            uploadFilesAsChunks(files);
        };

        const handleDragLeave = (e: DragEvent) => {
            e.stopPropagation()

            if(ifNotFiles(e)) return;

            if (containerRef.current) {
                containerRef.current.classList.remove("dragging");
            }
        };

        container.addEventListener("dragover", handleDragOver);
        container.addEventListener("drop", handleDrop);
        container.addEventListener("dragleave", handleDragLeave);

        return () => {
            container.removeEventListener("dragover", handleDragOver);
            container.removeEventListener("drop", handleDrop);
            container.removeEventListener("dragleave", handleDragLeave);
        };
    }, [containerRef, uploadFilesAsChunks]);

    return null; 
}

export default useDropHook;
