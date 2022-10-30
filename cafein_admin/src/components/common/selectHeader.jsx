import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Check } from "../../svg/check.svg";
import * as S from "../../pages/style copy";
import Row from "../atoms/row";

const SelectHeader = ({
  children,
  menu,
  menu1,
  menu2,
  menu3,
  Tmenu3,
  setMenu,
  Tmenu2,
  Tmenu1,
  btn,
  onDesc,
  onAsc,
  sort,
}) => {
  const navigate = useNavigate();
  return (
    <Headers>
      <div>
        <Menu menustate={menu === menu1} onClick={() => navigate(`/${menu1}`)}>
          {Tmenu1}
        </Menu>
        <Menu menustate={menu === menu2} onClick={() => navigate(`/${menu2}`)}>
          {Tmenu2}
        </Menu>
        {!!menu3 && (
          <Menu menustate={menu === menu3} onClick={() => navigate(`/${menu3}`)}>
            {Tmenu3}
          </Menu>
        )}
      </div>
      <Row gap={16}>
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
    </Headers>
  );
};

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 52px 102px 24px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: baseline;
  }
`;

const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 18px;
  font-weight: 600;
  ${(props) => props.menustate && "font-weight:bold; font-size: 22px"};
  padding-bottom: 8px;
  cursor: pointer;
`;

export default SelectHeader;
