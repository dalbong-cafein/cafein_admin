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
import Row from "../atoms/row";

const SideBar = () => {
  return (
    <Container>
      <div>
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
      </div>
      <Profile>
        <Row gap={10}>
          <Pic></Pic>
          <Column>
            <p>카페인</p>
            <p>관리자</p>
          </Column>
        </Row>
      </Profile>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 32px 0 32px;
  width: 296px;
  height: 72vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    pointer: cursor;
    & > div {
      & > svg {
        path {
          fill: #fff;
        }
      }
    }
  }
  & > div:last-child {
  }
`;

const Profile = styled.div`
  margin: 0 20px;
`;
const Pic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > p {
    color: #fff;
  }
`;
export default SideBar;
