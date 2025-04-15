import styled from "styled-components";


export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 20px 20px 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: black;
`;

export const CloseModal = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

export const ModalBody = styled.div`
  min-width: 200px;
  min-height: 200px;
  overflow: hidden;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img, video {
    max-height: 80vh;
  }


  @media (max-width: 768px) {
    img, video {
      max-width: 80vw;
    }
  }
`;

export const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 40px;
    --g: radial-gradient(farthest-side,#0000 calc(95% - 3px),#000 calc(100% - 3px) 98%,#0000 101%) no-repeat;
    background: var(--g), var(--g), var(--g);
    background-size: 30px 30px;
    animation: l9 1s infinite alternate;
}
@keyframes l9 {
  0% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
  20% {
    background-position: 0 0, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0 100%, 50% 0, 100% 50%;
  }
  60% {
    background-position: 0 50%, 50% 100%, 100% 0;
  }
  80% {
    background-position: 0 50%, 50% 50%, 100% 100%;
  }
  100% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
`;

export const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: black;
`;

export const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: black;
`;

export const ErrorPreview = styled.div`
  display:flex;
  flex-direction: column;
  gap:20px;
  text-align:center;
`