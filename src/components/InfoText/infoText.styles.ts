import styled from "styled-components";


export const StyledInfoWrapper = styled.div<{ $posX: number, $posY: number }>`
    position: fixed;
    width: fit-content;
    height: fit-content;
    max-width: 200px;
    top: ${({ $posY }) => $posY}px;
    left: ${({ $posX }) => $posX}px;
    background-color: #373547;
    padding: 5px;
    font-size: 12px;
    text-wrap: nowrap;
    z-index: 1;
`;

export const InfoElement = styled.div`
    font-size: 12px;
    color: white;
    text-wrap: wrap;
    overflow-wrap: break-word;
`;
