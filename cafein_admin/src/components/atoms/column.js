import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  display: -webkit-box;
  -webkit-flex-direction: column;
  ${(props) => props.gap && `gap: ${props.gap}px`};
  ${(props) => props.justify && ` justify-content: ${props.justify}`};
  ${(props) => props.align && ` align-items: ${props.align}`};
`;

export default Column;
