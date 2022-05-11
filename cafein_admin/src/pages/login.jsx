import styled from "styled-components";

const LogIn = () => {
  return (
    <Background>
      <p style={{ color: "#fff" }}>cafein</p>
      <input type="text" placeholder="아이디를 입력해주세요" />
      <input type="password" placeholder="비밀번호를 입력해주세요" />
      <p style={{ color: "#fff" }}>아이디 기억하기</p>
      <Box>로그인</Box>
    </Background>
  );
};

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Box = styled.div``;

export default LogIn;
