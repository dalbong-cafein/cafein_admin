import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NoneDiv = ({ text, loc, padding }) => {
  const navigate = useNavigate();
  return (
    <Box padding={padding}>
      <p>{text} 내역이 없습니다.</p>
      <p onClick={() => navigate(`/${loc}`)}>해당 페이지로 이동</p>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  & > p:first-child {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }
  & > p:nth-child(2) {
    color: #2563eb;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
`;

export default NoneDiv;
