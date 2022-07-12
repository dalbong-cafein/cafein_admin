import Row from "./atoms/row";
import * as S from "../pages/style copy";
import styled from "styled-components";
import { ReactComponent as Memo } from "../svg/memo.svg";
import Stars from "./atoms/stars";
const ReviewTemp = ({
  temp,
  onModal,
  setSelectItem,
  setMemoModal,
  setMemoId,
}) => {
  return (
    <S.DataBox>
      {temp &&
        temp.map((item, i) => (
          <ItemRow key={i} hasMemoId={item.memoId}>
            <div onClick={() => onModal(item)}>
              {String(item.reviewId).padStart(6, "0")}
            </div>
            <div onClick={() => onModal(item)}>
              <div>
                {item.recommendation === "GOOD"
                  ? "추천해요"
                  : item.recommendation === "NORMAL"
                  ? "그저그래요"
                  : "별로예요"}
              </div>
            </div>
            <div onClick={() => onModal(item)}>
              <Row gap={16} align={"baseline"} style={{ fontSize: "14px" }}>
                <Row gap={8} align={"baseline"}>
                  와이파이
                  <Stars width={11} gap={2} num={item.detailEvaluation.wifi} />
                </Row>
                <Row gap={8} align={"baseline"}>
                  콘센트
                  <Stars
                    width={11}
                    gap={2}
                    num={item.detailEvaluation.socket}
                  />
                </Row>
                <Row gap={8} align={"baseline"}>
                  화장실
                  <Stars
                    width={11}
                    gap={2}
                    num={item.detailEvaluation.restroom}
                  />
                </Row>
                <Row gap={8} align={"baseline"}>
                  테이블
                  <Stars
                    width={11}
                    gap={2}
                    num={item.detailEvaluation.tableSize}
                  />
                </Row>
              </Row>
              <Row gap={16} align={"baseline"} style={{ fontSize: "14px" }}>
                {item.content
                  ? item.content.length > 80
                    ? `${item.content.slice(0, 80)}...`
                    : item.content
                  : "-"}
              </Row>
            </div>
            <div onClick={() => onModal(item)}>
              {String(item.writerId).padStart(6, "0")}
            </div>
            <S.DataBox onClick={() => onModal(item)}>
              <div>{String(item.storeId).padStart(6, "0")}</div>
              <div>{item.storeName}</div>
            </S.DataBox>
            <div onClick={() => onModal(item)}>
              {item.regDateTime.split("T")[0]}
            </div>
            <div onClick={() => onModal(item)}>
              {item.modDateTime.split("T")[0]}
            </div>
            <div>
              <Memo
                onClick={() => {
                  setSelectItem(item);
                  setMemoId(item.memoId);
                  setMemoModal(true);
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
  height: 72px;
  cursor: pointer;
  border-bottom: 1px solid #515151;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 18px;
    box-sizing: border-box;
    flex: 0.7;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(2) > div {
    margin: auto;
    border-radius: 20px;
    color: #fc6406;
    font-size: 13px;
    background-color: #fff0e6;
    padding: 4px 8px;
  }
  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    text-aline: left;
    flex: 3.5;
    gap: 8px;
    & > div {
      padding-left: 12px;
    }
  }

  & > div:nth-child(5) {
    flex: 1.5;
  }
  & > div:last-child {
    border-right: none;
    border-bottom: none;
  }
  & > div:nth-child(2) {
    justify-content: start;
  }
  & > div:last-child {
    & > svg {
      path {
        fill: ${(props) => (props.hasMemoId ? "#E3E3E3" : "#646464")};
      }
    }
  }
`;

export default ReviewTemp;
