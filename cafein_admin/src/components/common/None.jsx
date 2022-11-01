import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Cafe } from "../../svg/emojicafe.svg";
import { ReactComponent as Notice } from "../../svg/NoneNoticeIcon.svg";
import { ReactComponent as User } from "../../svg/NoneUserIcon.svg";

const None = ({ text, href, text2 }) => {
  const navigate = useNavigate();
  return (
    <Box>
      {(text == "카페" || text == "리뷰" || text == "마케팅 서비스") && <Cafe />}
      {text == "회원" && <User />}
      {(text == "신고" || text == "공지사항" || text == "QnA") && <Notice />}
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
    font-size: 16px;
    font-weight: 600;
    margin: 15px 0 20px;
  }
  & > p:nth-child(3) {
    color: #2563eb;
    cursor: pointer;
  }
`;

export default None;
