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

export const UploadForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const UploadFormTitle = styled.h1`
    font-size: 20px;
    color: #fff;
`;

export const UploadFormInput = styled.input`
    display: none;
`;

export const UploadFormButton = styled.button`
    padding: 10px;
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
`;

export const UploadCustomButton = styled.label`
    padding: 10px;
    background-color: #212121;
    color: #fff;
    border: none;
    cursor: pointer;
`;
