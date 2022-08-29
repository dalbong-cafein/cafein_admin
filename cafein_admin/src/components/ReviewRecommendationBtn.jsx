import styled from "styled-components";

export default function ReviewRecommendationBtn({ recommendation, isDetail }) {
  return (
    <Div isDetail={isDetail}>
      <p>
        {recommendation === "GOOD"
          ? "추천해요"
          : recommendation === "NORMAL"
          ? "그저그래요"
          : "별로예요"}
      </p>
    </Div>
  );
}

const Div = styled.div`
  border-radius: 20px;
  color: #fc6406;
  font-size: 13px;
  background-color: #fff0e6;
  padding: 4px 8px;
  & > p {
    color: #fc6406;
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
