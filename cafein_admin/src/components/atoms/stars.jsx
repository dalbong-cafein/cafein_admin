import { ReactComponent as Star } from "../../svg/Star.svg";
import styled from "styled-components";

const Stars = ({ width, gap, num }) => {
  return (
    <Row width={width} gap={gap}>
      <Star />
      <Star />
      <Star />
      <Star />
      <p>{num}</p>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  gap: ${(props) => props.gap && props.gap}px;
  & > svg {
    width: ${(props) => props.width && props.width}px;
    height: ${(props) => props.width && props.width}px;
  }

  & > svg:first-child {
    path {
      fill: ${(props) => props.isFill >= 1 && "#ffce4a"};
    }
  }
  & > svg:nth-child(2) {
    path {
      fill: ${(props) => props.isFill >= 2 && "#ffce4a"};
    }
  }
  & > svg:nth-child(3) {
    path {
      fill: ${(props) => props.isFill >= 3 && "#ffce4a"};
    }
  }
  & > svg:nth-child(4) {
    path {
      fill: ${(props) => props.isFill >= 4 && "#ffce4a"};
    }
  }
`;
export default Stars;
