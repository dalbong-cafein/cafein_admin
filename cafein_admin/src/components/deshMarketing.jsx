import styled from "styled-components";

const DeshMarketing = ({ item }) => {
  return (
    <Box>
      <div>{String(item.memberId).padStart(5, "0")}</div>
      <div style={{ textAlign: "center" }}>{item.itemName}</div>
      <div>{String(item.regDateTime).split("T")[0]}</div>
      <div>
        {item.processingDateTime
          ? String(item.processingDateTime).split("T")[0]
          : "-"}
      </div>
      <div>
        <Btn content={item.status}>
          {item.processingDateTime !== null ? "완료" : "미완료"}
        </Btn>
      </div>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & > div {
    flex: 1;
    text-align: center;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
`;

const Btn = styled.div`
  margin: 0 auto;
  background-color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
  width: 96px;
  height: 28px;
  text-align: center;
  opacity: 0.3;

  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;

export default DeshMarketing;
