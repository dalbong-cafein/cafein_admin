import styled from "styled-components";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";

const Header = ({ text, subText, inner }) => {
  return (
    <Row>
      <Menu isInner={subText}>{text}</Menu>
      {subText ? (
        <Txt>{subText}</Txt>
      ) : (
        <Txt2>
          <Arrow />
          {inner}
        </Txt2>
      )}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 56px 48px 0;
  display: flex;
  gap: 20px;
  align-items: baseline;
`;

const Menu = styled.div`
  color: ${(props) => (props.inInner ? "#fff" : "#8B8B8B")};
  font-size: 24px;
  font-weight: bold;
`;

const Txt = styled.div`
  color: #acacac;
  font-size: 16px;
`;

const Txt2 = styled.div`
  font-size: 20px;
  font-weight: bold;
  & > svg {
    margin-right: 14px;
  }
`;

export default Header;
