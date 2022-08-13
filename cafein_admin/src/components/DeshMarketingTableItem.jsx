import styled from "styled-components";

const TableItem = ({ item }) => {
  return (
    <Box>
      <div>{String(item.memberId).padStart(6, "0")}</div>
      <div style={{ textAlign: "center" }}>{item.itemName}</div>
      <div>{String(item.regDateTime).split("T")[0]}</div>
      <div>
        {item.processingDateTime
          ? String(item.processingDateTime).split("T")[0]
          : "-"}
      </div>
      <div>
        <Btn content={item.status}>
          <div />
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
  cursor: pointer;
  & > div {
    flex: 1;
    text-align: center;
  }
  & > div:nth-child(2) {
    flex: 2;
  }
`;

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  border-radius: 6px;
  color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
    opacity: 0.3;
    border-radius: 4px;
  }
`;

export default TableItem;
