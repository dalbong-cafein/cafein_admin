import Row from "./atoms/row";
import styled from "styled-components";
import { delEventImgApi } from "../util/events";

const EventMapBox = ({ temp, items, page, i, loadData }) => {
  const delImg = (id) => {
    delEventImgApi(id)
      .then((res) => {
        loadData();
      })
      .catch((err) => window.alert("나중에 다시 시도해주세요"));
  };
  return (
    <Row gap={40}>
      {temp
        .slice(items * (page - 1), items * (page - 1) + items)
        .slice(i, i + 2)
        .map((item, i) => (
          <EventBox key={i}>
            <div>
              <p>{String(item.regDateTime).split("T")[0]}</p>
              <p onClick={() => delImg(item.eventImageId)}>삭제</p>
            </div>
            <div>
              <img src={item.eventImageUrl} alt="" />
            </div>
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
      cursor: pointer;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    height: 72px;
    margin-top: 12px;
    border-radius: 8px;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
`;

export default EventMapBox;
