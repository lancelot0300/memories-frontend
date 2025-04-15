import { styled } from "styled-components";

type StatusProps = {
  $status: string | undefined;
};

export const StatusWrapper = styled.div<StatusProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 300px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: ${({ $status }) =>
    $status === "Downloaded" || $status === "Uploaded"
      ? "rgb(0 69 18)"
      : $status === "Error"
      ? "rgb(91 0 0)"
      : "rgb(0 37 105)"};
  border-radius: 1rem;
  border: 1px solid
    ${({ $status }) =>
      $status === "Downloaded" || $status === "Uploaded"
        ? "green"
        : $status === "Error"
        ? "red"
        : "blue"};
  pointer-events: all;
`;

export const StatusesWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: flex-end;
  gap: 10px;
  z-index: 100;
  pointer-events: none;
`;

export const StatusFileName = styled.p`
  white-space: nowrap;
  width: fit-content;
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusFile = styled.p`
  width: fit-content;
`;

export const LeftWrapper = styled.div`
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;
export const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
