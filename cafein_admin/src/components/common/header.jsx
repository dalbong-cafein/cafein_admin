import styled from "styled-components";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";

const Header = ({ align, mSize, text, subText, mcolor, inner, children }) => {
  return (
    <Row align={align}>
      <div>
        <Menu mSize={mSize} mcolor={mcolor}>
          {text}
        </Menu>
        {subText && <Txt>{subText}</Txt>}
        {inner && (
          <Txt2>
            <Arrow />
            {inner}
          </Txt2>
        )}
      </div>
      {children}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 102px 24px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: ${(props) => (props.align ? props.aplign : "baseline")};
  }
`;

const Menu = styled.div`
  color: ${(props) => props.mcolor};
  font-size: ${(props) => (props.mSize ? props.mSize : 22)}px;
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
