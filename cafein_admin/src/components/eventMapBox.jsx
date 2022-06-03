import Row from "./atoms/row";
import styled from "styled-components";

const EventMapBox = ({ temp, items, page, i }) => {
  return (
    <Row gap={40}>
      {temp
        .slice(items * (page - 1), items * (page - 1) + items)
        .slice(i, i + 2)
        .map((item, i) => (
          <EventBox key={i}>
            <div>
              <p>{item.date}</p>
              <p>삭제</p>
            </div>
            <div></div>
          </EventBox>
        ))}
    </Row>
  );
};

const EventBox = styled.div`
  width: 300px;
  margin-bottom: 32px;
  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    & > p:first-child {
      color: ${(props) => (props.active ? "#fc6406" : "#e3e3e3")};
      font-size: 14px;
    }
    & > p:nth-child(2) {
      color: #fc6406;
      font-size: 14px;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 72px;
    margin-top: 12px;
    background-color: #26ba6a;
    border-radius: 8px;
  }
`;

export default EventMapBox;
