import { ReactComponent as Star } from "../../svg/Star.svg";
import styled from "styled-components";

const Stars = ({ width, gap, num, isNum, color, i }) => {
  return (
    <Row width={width} gap={gap} isFill={i || num} color={color}>
      <Star />
      <Star />
      <Star />
      <Star />
      {isNum && <p>{num}</p>}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  gap: ${(props) => props.gap && props.gap}px;
  & > p {
    color: #acacac;
  }
  & > svg {
    width: ${(props) => props.width && props.width}px;
    height: ${(props) => props.width && props.width}px;
  }

  & > svg:first-child {
    path {
      fill: ${(props) => props.isFill >= 1 && props.color};
    }
  }
  & > svg:nth-child(2) {
    path {
      fill: ${(props) => props.isFill >= 2 && props.color};
    }
  }
  & > svg:nth-child(3) {
    path {
      fill: ${(props) => props.isFill >= 3 && props.color};
    }
  }
  & > svg:nth-child(4) {
    path {
      fill: ${(props) => props.isFill >= 4 && props.color};
    }
  }
`;
export default Stars;
