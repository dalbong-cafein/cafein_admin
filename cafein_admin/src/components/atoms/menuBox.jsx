import styled from "styled-components";

const MenuBox = ({ children }) => {
  return <Box>{children}</Box>;
};

const Box = styled.div`
  width: 156px;
  height: 40px;
  padding: 0 10px;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  gap: 9px;
  align-items: baseline;
`;
export default MenuBox;
