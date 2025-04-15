import styled from "styled-components";

export const UploadModal = styled.div`
    min-width: 350px;
    min-height: 300px;
    padding: 20px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    color: #fff;
     backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
`;

export const UploadFormButton = styled.button`
    padding: 10px;
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
    display: block;
    margin: 20px auto 0;
`;
