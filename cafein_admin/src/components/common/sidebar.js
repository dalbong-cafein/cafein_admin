import styled from "styled-components";

//atoms
import MenuBox from "../atoms/menuBox";

//icon
import { ReactComponent as Cup } from "../../svg/Cup.svg";
import { ReactComponent as Desh } from "../../svg/desh.svg";
import { ReactComponent as User } from "../../svg/user.svg";
import { ReactComponent as Review } from "../../svg/review.svg";
import { ReactComponent as Marketing } from "../../svg/marketing.svg";
import { ReactComponent as Notice } from "../../svg/notice.svg";
import { ReactComponent as Statictis } from "../../svg/statictis.svg";

const SideBar = () => {
  return (
    <Container>
      <MenuBox>
        <Desh />
        대시보드
      </MenuBox>
      <MenuBox>
        <Cup />
        카페관리
      </MenuBox>
      <MenuBox>
        <Review />
        카페리뷰
      </MenuBox>
      <MenuBox>
        <User />
        회원정보
      </MenuBox>
      <MenuBox>
        <Marketing />
        마케팅 서비스
      </MenuBox>
      <MenuBox>
        <Notice />
        공지사항
      </MenuBox>
      <MenuBox>
        <Statictis />
        통계
      </MenuBox>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 10rem;
  padding-top: 64px;
  width: 296px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  & > div {
    pointer: cursor;
    & > svg {
      path {
        fill: #fff;
      }
    }
  }
`;
export default SideBar;
