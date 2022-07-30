import styled from "styled-components";
const StateBtn = ({ content }) => {
  return (
    <Btn
      content={
        content === "NORMAL"
          ? "기본"
          : content === "SUSPENSION"
          ? "신고"
          : "탈퇴"
      }
    >
      <div />
      {content === "NORMAL"
        ? "기본"
        : content === "SUSPENSION"
        ? "신고"
        : "탈퇴"}
    </Btn>
  );
};

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  border-radius: 6px;
  color: ${(props) =>
    props.content === "기본"
      ? "#26BA6A"
      : props.content === "신고"
      ? "#f44336"
      : "#ff9800"};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) =>
      props.content === "기본"
        ? "#26BA6A"
        : props.content === "신고"
        ? "#f44336"
        : "#ff9800"};
    opacity: 0.3;
    border-radius: 4px;
  }
`;

export default StateBtn;
