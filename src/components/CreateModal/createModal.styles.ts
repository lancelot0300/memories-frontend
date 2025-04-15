import styled from "styled-components";


type OverLayProps = {
    $wihoutOverlay: boolean | undefined
}
export const Overlay = styled.div<OverLayProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${({ $wihoutOverlay }) => $wihoutOverlay ? '' : 'rgba(0, 0, 0, 0.5)'};
    user-select: none;
`;

export const PortalBody = styled.div`
posistion:relative;
`