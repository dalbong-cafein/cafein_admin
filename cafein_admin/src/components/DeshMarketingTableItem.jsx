import styled from "styled-components";

const TableItem = ({ item }) => {
  return (
    <Box>
      <div>
        <div style={{ color: "#E3E3E3" }}>{String(item.memberId).padStart(6, "0")}</div>
        <div style={{ color: "#ACACAC" }}>{String(item.regDateTime).split("T")[0]}</div>
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
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #515151;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 6px;
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
