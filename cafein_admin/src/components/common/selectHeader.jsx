import styled from "styled-components";
const SelectHeader = ({ menu, menu1, menu2, setMenu, Tmenu2, Tmenu1 }) => {
  return (
    <Headers>
      <div>
        <Menu menustate={menu === menu1} onClick={() => setMenu(menu1)}>
          {Tmenu1}
        </Menu>
        <Menu menustate={menu === menu2} onClick={() => setMenu(menu2)}>
          {Tmenu2}
        </Menu>
      </div>
    </Headers>
  );
};

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 102px 24px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 24px;
  ${(props) =>
    props.menustate && "font-weight:bold; border-bottom:2px solid #fff"};
  padding-bottom: 8px;
  cursor: pointer;
`;

export default SelectHeader;
