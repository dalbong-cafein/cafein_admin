import styled from "styled-components";
import { ReactComponent as Cafe } from "../svg/emojicafe.svg";

const None = ({ text, children }) => {
  return (
    <Box>
      <Cafe />
      <p>등록된 {text}가 없습니다.</p>
      {children}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 648px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 39px;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 100px;
    height: 90px;
  }
  & > p:nth-child(2) {
    color: #e3e3e3;
    font-size: 20px;
    font-weight: 700;
  }
`;

export default None;
