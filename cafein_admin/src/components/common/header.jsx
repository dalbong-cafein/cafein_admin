import styled from "styled-components";
import { ReactComponent as Arrow } from "../../svg/arrow.svg";
import { ReactComponent as Check } from "../../svg/check.svg";

import * as S from "../../pages/style copy";

const Header = ({
  btn = true,
  align,
  mSize,
  text,
  subText,
  mcolor,
  inner,
  children,
  onAsc,
  onDesc,
  sort,
  halfWidth,
}) => {
  return (
    <SpaceRow align={align} halfWidth>
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
      <Row gap={15}>
        {children && children}
        {btn && (
          <>
            <S.Sbtn onClick={onDesc}>
              최신순
              {sort === "DESC" && <Check />}
            </S.Sbtn>
            <S.Sbtn onClick={onAsc}>오래된 순{sort === "ASC" && <Check />}</S.Sbtn>
          </>
        )}
      </Row>
    </SpaceRow>
  );
};
const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SpaceRow = styled(Row)`
  width: ${(props) => (props.halfWidth ? "50%" : "100%")};
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
