import { useNavigate } from "react-router-dom";
import { HomeContainer } from "../Home/home.styles";
import { styled } from "styled-components";
import { useAppDispatch } from "../../state/store";
import { setUnkownPathAndFetchAsync } from "../../state/features/path/pathSlice";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  width: 100vw;

`;

const NotFoundText = styled.h1`
  font-size: 40px;
  color: #fff;

  & > button {
    font-size:30px;
  }
`;

function NotFound() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleButtonClick = () => {
    dispatch(setUnkownPathAndFetchAsync(""))
    navigate("/", {replace: true})
  }

  return (
    <HomeContainer>
      <NotFoundContainer>
        <NotFoundText>404</NotFoundText>
        <NotFoundText>You are in wrong place!</NotFoundText>
        <button onClick={handleButtonClick}>Go to home</button>
      </NotFoundContainer>
    </HomeContainer>
  );
}

export default NotFound;
