import styled from "styled-components";
import { ReactComponent as Emoji } from "../svg/login.svg";
import { ReactComponent as Logo } from "../svg/Logo.svg";
import { ReactComponent as Kakao } from "../svg/kakao.svg";

const LogIn = ({ KAKAO_AUTH_URL }) => {
  return (
    <Background>
      <Logo />
      <Emoji />
      <Box>
        <a href={KAKAO_AUTH_URL}>
          <Kakao />
          <p>카카오로 시작하기</p>
        </a>
      </Box>
    </Background>
  );
};

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > svg:first-child {
    width: 164px;
    height: 41px;
  }
  & > svg:nth-child(2) {
    margin: 76px 0 16px;
  }
`;

const Box = styled.div`
  width: 328px;
  height: 56px;
  background-color: #fee500;
  border-radius: 8px;
  cursor: pointer;
  & > a {
    width: 328px;
    height: 56px;
    text-decoration: none;
    display: flex;
    gap: 7px;
    justify-content: center;
    align-items: center;
    & > p {
      font-size: 15px;
      color: #3e2723;
    }
  }
`;

export default LogIn;
