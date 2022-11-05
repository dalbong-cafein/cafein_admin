import Row from "./atoms/row";
import styled from "styled-components";
import { delEventImgApi } from "../util/events";

const EventMapBox = ({ data, item, page, i, loadData, noDel }) => {
  return (
    <Row gap={40}>
      {data
        .slice(item * (page - 1), item * (page - 1) + item)
        .slice(i, i + 2)
        .map((item, i) => (
          <EventBox key={i} img={item.eventImageDto.imageUrl}>
            <div>
              <p>{String(item.regDateTime).split("T")[0]}</p>
            </div>
            <div />
          </EventBox>
        ))}
    </Row>
  );
};

const EventBox = styled.div`
  width: 300px;
  margin-bottom: 16px;
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
    // background: ${({ img }) => img && `url(${img})`} no-repeat center center/contain;
  }
`;

const EventMapBoxs = ({ data, item, page, loadData, nowBanner }) => {
  const delImg = (id) => {
    delEventImgApi(id)
      .then((res) => {
        loadData();
      })
      .catch((err) => window.alert("나중에 다시 시도해주세요"));
  };

  return (
    <>
      <Card style={{ marginBottom: "16px" }}>
        <p>현재 배너</p>
        <EventBox img={nowBanner?.eventImageDto?.imageUrl}>
          <div>
            <p>{nowBanner?.regDateTime.split("T")[0] || "-"}</p>
            <p onClick={() => delImg(nowBanner.eventId)}>삭제</p>
          </div>
          {nowBanner?.eventImageDto && (
            <div>
              <img src={nowBanner?.eventImageDto?.imageUrl} alt="" />
            </div>
          )}
        </EventBox>
      </Card>
      <Card>
        <p>이전 배너</p>
        {[2, 4, 6, 8].map((num, i) => (
          <EventMapBox
            key={i}
            data={data}
            item={item}
            page={page}
            i={num}
            loadData={loadData}
            noDel
          />
        ))}
      </Card>
    </>
  );
};

const Card = styled.div`
  background-color: #333333;
  border-radius: 16px;
  padding: 16px;
  & > p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
  }
`;
export default EventMapBoxs;
