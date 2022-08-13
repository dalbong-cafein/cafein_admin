import styled from "styled-components";

//icon
import { ReactComponent as Cup } from "../../svg/Cup.svg";
import { ReactComponent as Desh } from "../../svg/desh.svg";
import { ReactComponent as User } from "../../svg/user.svg";
import { ReactComponent as Review } from "../../svg/review.svg";
import { ReactComponent as Marketing } from "../../svg/marketing.svg";
import { ReactComponent as Notice } from "../../svg/notice.svg";
import { ReactComponent as Statictis } from "../../svg/statictis.svg";
import { ReactComponent as LogoIcon } from "../../svg/Logo.svg";

import SidemenuProfile from "../Sidemenu_profile";

import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const menu = window.location.pathname.split("/")[1];
  return (
    <Container>
      <LogoIcon onClick={() => navigate("/")} />
      <Box>
        <div>
          <MenuBox svgW={15} onClick={() => navigate("/")} isT={menu === ""}>
            <div>
              <Desh />
            </div>
            대시보드
          </MenuBox>
          <MenuBox
            svgW={16}
            onClick={() => navigate("/management")}
            isT={menu === "management"}
          >
            <div>
              <Cup />
            </div>
            카페 관리
          </MenuBox>
          <MenuBox
            svgW={16.6}
            onClick={() => navigate("/review")}
            isT={menu === "review"}
          >
            <div>
              <Review />
            </div>
            카페 리뷰
          </MenuBox>
          <MenuBox
            svgW={13.3}
            onClick={() => navigate("/user")}
            isT={menu === "user"}
          >
            <div>
              <User />
            </div>
            회원 정보
          </MenuBox>
          <MenuBox
            svgW={18.5}
            onClick={() => navigate("/marketing")}
            isT={menu === "marketing"}
          >
            <div>
              <Marketing />
            </div>
            마케팅 서비스
          </MenuBox>
          <MenuBox
            svgW={16.2}
            onClick={() => navigate("/notice")}
            isT={menu === "notice"}
          >
            <div>
              <Notice />
            </div>
            서비스 관리
          </MenuBox>
          <a
            style={{ textDecoration: "none" }}
            target="blank"
            href="https://cafeinofficial.notion.site/Cafein-1fb25a757f9a4424880c6be28df18807"
          >
            <MenuBox svgW={18.3} isT={menu === "statistics"}>
              <div>
                <Statictis />
              </div>
              통계
            </MenuBox>
          </a>
        </div>
        <SidemenuProfile />
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 73px 124px 57px 57px;
  width: 296px;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  & > svg {
    width: 93px;
    height: 26px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer: cursor;
  }
`;

const MenuBox = styled.div`
  width: 156px;
  height: 40px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  gap: 9px;
  align-items: center;
  cursor: pointer;
  & > div {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
      width: ${(props) => props.svgW && props.svgw}px;
      height: ${(props) => props.svgW && props.svgw}px;
      path {
        fill: ${(props) => (props.isT ? "#fff" : "#646464")};
      }
    }
  }
`;
export default SideBar;
