import styled from "styled-components";

export const FolderGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
    justify-content: center;
    justify-items: center;
    gap: 20px;
    padding: 20px;
    width: 100%;
    margin: 0 auto;

    border: 2px dashed var(--background-color);

   
`;


type ContainerProps = {
  $isDragging?: boolean;
}
export const HomeContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: var(--appHeight);
    cursor: ${({ $isDragging }) => $isDragging ? 'crosshair' : 'default'};


    &.dragging:before {
    content: "";
    display: block;
    width: calc(100% - 20px);
    height: calc(var(--appHeight) - 20px);
    margin: 10px;
    border: 1px dotted #fff;
    position: fixed;
    }
`;


