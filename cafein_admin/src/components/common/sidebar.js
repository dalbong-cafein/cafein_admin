import styled from "styled-components";

//icon
import { ReactComponent as Cup } from "../../svg/Cup.svg";
import { ReactComponent as Desh } from "../../svg/desh.svg";
import { ReactComponent as User } from "../../svg/user.svg";
import { ReactComponent as Review } from "../../svg/review.svg";
import { ReactComponent as Marketing } from "../../svg/marketing.svg";
import { ReactComponent as Notice } from "../../svg/notice.svg";
import { ReactComponent as Statictis } from "../../svg/statictis.svg";
import { ReactComponent as Exit } from "../../svg/exit.svg";
import { ReactComponent as LogoIcon } from "../../svg/Logo.svg";

import Row from "../atoms/row";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SideBar = ({ menu }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoIcon />
      <Box>
        <div>
          <MenuBox onClick={() => navigate("/desh")}>
            <Desh isT={menu === "desh"} />
            대시보드
          </MenuBox>
          <MenuBox onClick={() => navigate("/management")}>
            <Cup isT={menu === "management"} />
            카페관리
          </MenuBox>
          <MenuBox onClick={() => navigate("/review")}>
            <Review isT={menu === "review"} />
            카페리뷰
          </MenuBox>
          <MenuBox onClick={() => navigate("/user")}>
            <User isT={menu === "user"} />
            회원정보
          </MenuBox>
          <MenuBox onClick={() => navigate("/marketing")}>
            <Marketing isT={menu === "marketing"} />
            마케팅 서비스
          </MenuBox>
          <MenuBox onClick={() => navigate("/notice")}>
            <Notice isT={menu === "notice"} />
            공지사항
          </MenuBox>
          <MenuBox onClick={() => navigate("/statistics")}>
            <Statictis isT={menu === "statistics"} />
            통계
          </MenuBox>
        </div>
        <Profile>
          <Row align={"center"} gap={60}>
            <Row gap={12}>
              <Pic></Pic>
              <Column>
                <p>카페인</p>
                <p>관리자</p>
              </Column>
            </Row>
            <Exit />
          </Row>
        </Profile>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 73px 124px 57px 57px;
  width: 296px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 72px;
  & > svg {
    width: 118px;
    height: 39px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 350px;
  align-items: center;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer: cursor;
    & > div > svg {
      path {
        fill: #fff;
      }
    }
  }
`;

const Profile = styled.div``;
const Pic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > p:first-child {
    font-size: 16px;
    font-weigth: bold;
    color: #fff;
  }
  & > p:last-child {
    font-size: 14px;
    color: #acacac;
  }
`;

const MenuBox = styled.div`
  width: 156px;
  height: 40px;
  padding: 0 10px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  gap: 9px;
  align-items: baseline;
  pointer: cursor;
`;
export default SideBar;
