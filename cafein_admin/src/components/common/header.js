import styled from "styled-components";

//atoms
import Row from "../atoms/row";

//icon
import { ReactComponent as LogoIcon } from "../../svg/Logo.svg";

const Header = () => {
  return (
    <Container>
      <LogoIcon />
      <Row gap={16} align={"baseline"}>
        <Menu>카페관리</Menu>
        <Txt>등록된 카페 {}건</Txt>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 10rem;
  padding: 72px 56px 48px 56px;
  position: absolute;
  display: flex;
  gap: 152px;
  top: 0;
  left: 0;
  & > svg {
    width: 118px;
    height: 39px;
  }
`;

const Menu = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const Txt = styled.div`
  color: #acacac;
  font-size: 16px;
`;
export default Header;
