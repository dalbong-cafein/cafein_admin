import styled from "styled-components";

export default function ReviewRecommendationBtn({ recommendation, isDetail }) {
  return (
    <Div isDetail={isDetail} recommendation={recommendation}>
      <p>
        {recommendation === "GOOD"
          ? "추천해요"
          : recommendation === "NORMAL"
          ? "무난해요"
          : "아쉬워요"}
      </p>
    </Div>
  );
}

const Div = styled.div`
  border-radius: 20px;
  color: ${(props) =>
    props.recommendation == "GOOD"
      ? "#fc6406"
      : props.recommendation == "NORMAL"
      ? "#FF9800"
      : "#646464"};
  font-size: 13px;
  background-color: ${(props) =>
    props.recommendation == "GOOD"
      ? "#FFF0E6"
      : props.recommendation == "NORMAL"
      ? "#FFF3E0"
      : "#E3E3E3"};
  padding: 4px 8px;
  & > p {
    color: ${(props) =>
      props.recommendation == "GOOD"
        ? "#fc6406"
        : props.recommendation == "NORMAL"
        ? "#FF9800"
        : "#646464"};
    font-size: 13px;
  }
  ${(props) =>
    props.isDetail
      ? `margin-top: 32px;
position: inline;
max-width: 63px;
height: 22px;
border-radius: 20px;
display: flex;
justify-content: center;
align-items: center;`
      : " margin: auto;"}
`;
