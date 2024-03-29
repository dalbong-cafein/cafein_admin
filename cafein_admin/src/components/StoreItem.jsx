import styled from "styled-components";
import Row from "./atoms/row";
import * as S from "../pages/style copy";
import { ReactComponent as Memo } from "../svg/memo.svg";

const StoreItem = ({
  setCongestionScore,
  data,
  setDModal,
  setModalMemo,
  setMemoItem,
  setDetailStoreId,
}) => {
  const onModal = (item) => {
    setDetailStoreId(() => item.storeId);
    setDModal(true);
    setCongestionScore(() => item.congestionScoreAvg);
  };
  return (
    <S.DataBox style={{ height: "59vh" }}>
      {data &&
        data.map((item, i) => (
          <ItemRow key={i} hasMemoId={item.memoId}>
            <div onClick={() => onModal(item)}>{String(item.storeId).padStart(6, "0")}</div>
            <div onClick={() => onModal(item)}>
              <Row gap={16} align="center" style={{ marginLeft: "16px" }}>
                {item.storeImageDto ? <S.Photo img={item.storeImageDto.imageUrl} /> : <S.NonePic />}
                <p>{item.storeName}</p>
              </Row>
            </div>
            <div onClick={() => onModal(item)}>
              <p>{item.address.fullAddress}</p>
            </div>
            <div onClick={() => onModal(item)} style={{ textAlign: "center" }}>
              {item.congestionScoreAvg ? (
                <S.CongestionBtn id={parseInt(item.congestionScoreAvg)}>
                  {parseInt(item.congestionScoreAvg) == 1
                    ? "여유"
                    : parseInt(item.congestionScoreAvg) == 2
                    ? "보통"
                    : "혼잡"}
                </S.CongestionBtn>
              ) : (
                "-"
              )}
            </div>
            <div onClick={() => onModal(item)}>{item.reviewCnt}건</div>
            <div onClick={() => onModal(item)} style={{ textAlign: "center" }}>
              {item.recommendPercent ? Math.floor(item.recommendPercent * 10) / 10 + "%" : "-"}
            </div>
            <div onClick={() => onModal(item)}>{item.regDateTime.split("T")[0]}</div>
            <div onClick={() => onModal(item)}>{item.modDateTime.split("T")[0]}</div>
            <div>
              <Memo
                onClick={() => {
                  setMemoItem(item);
                  setModalMemo(true);
                }}
              />
            </div>
          </ItemRow>
        ))}
    </S.DataBox>
  );
};

const ItemRow = styled.div`
  display: flex;
  color: #e3e3e3;
  font-size: 14px;
  // flex: 1;
  height: calc(59vh / 9);
  cursor: pointer;
  border-bottom: 1px solid #515151;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 18px;
    box-sizing: border-box;
    flex: 1;
    border-right: 1px solid #515151;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
  & > div:nth-child(3),
  div:nth-child(2) {
    flex: 2.5;
  }
  & > div:nth-child(3) {
    & > p {
      width: 230px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
  & > div:nth-child(2) {
    & > div > p {
      width: 190px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
  }

  & > div:nth-child(2) {
    justify-content: start;
  }
  & > div:last-child {
    border-right: none;
    border-bottom: none;
    & > svg {
      path {
        fill: ${(props) => (props.hasMemoId ? "#E3E3E3" : "#646464")};
      }
    }
  }
`;

export default StoreItem;
