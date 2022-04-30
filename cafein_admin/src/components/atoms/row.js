import styled from "styled-components";

const Row = styled.div`
  display: flex;
  display: -webkit-box;
  ${(props) => props.justify && ` justify-content: ${props.justify}`};
  ${(props) => props.gap && `gap: ${props.gap}px`};
  ${(props) => props.align && ` align-items: ${props.align}`};
`;

export default Row;
