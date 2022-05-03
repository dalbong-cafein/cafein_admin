import styled from "styled-components";

const Sbtn = ({ children, isTrue }) => {
  return <Box isTrue={isTrue}>{children}</Box>;
};

const Box = styled.div`
  width: 102px;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  color: #fff;
  background-color: ${(props) => (props.isTrue ? "#2563EB" : "#333333")};
  border-radius: 6px;
  padding: auto 0;
  text-align: center;
`;
export default Sbtn;
