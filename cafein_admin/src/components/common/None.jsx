import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Cafe } from "../../svg/emojicafe.svg";

const None = ({ text, href, text2 }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Cafe />
      <p>등록된 {text}가 없습니다.</p>
      {href && <p onClick={() => navigate(href)}>{text2}</p>}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 648px;
  display: flex;
  flex-direction: column;

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
    margin: 39px 0 20px;
  }
  & > p:nth-child(3) {
    color: #2563eb;
    cursor: pointer;
  }
`;

export default None;
