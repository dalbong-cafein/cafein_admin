import styled from "styled-components";

import * as S from "../pages/style copy";
import Row from "./atoms/row";
import ReviewStarRow from "./common/modal/ReviewStarRow";
import ReviewRecommendationBtn from "./ReviewRecommendationBtn";

import { ReactComponent as Memo } from "../svg/memo.svg";

const ReviewItem = ({ data, onModal, setMemoModal, setMemoItem }) => {
  return (
    <S.DataBox>
      {data &&
        data.map((item, i) => (
          <ItemRow key={i} hasMemoId={item.memoId}>
            <div onClick={() => onModal(item)}>
              {String(item.reviewId).padStart(6, "0")}
            </div>
            <div onClick={() => onModal(item)}>
              <ReviewRecommendationBtn recommendation={item.recommendation} />
            </div>
            <div onClick={() => onModal(item)}>
              <Row gap={16} align="baseline" style={{ fontSize: "14px" }}>
                <ReviewStarRow
                  item1Title="와이파이"
                  item2Title="콘센트"
                  item1Star={item?.detailEvaluation?.wifi}
                  item2Star={item?.detailEvaluation?.socket}
                />
                <ReviewStarRow
                  item1Title="화장실"
                  item2Title="테이블"
                  item1Star={item?.detailEvaluation?.restroom}
                  item2Star={item?.detailEvaluation?.tableSize}
                />
              </Row>
              {item.content && (
                <Row gap={16} align="baseline" style={{ fontSize: "14px" }}>
                  {item.content.length > 45
                    ? `${item.content.slice(0, 45)}...`
                    : item.content}
                </Row>
              )}
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
                  setMemoItem(item);
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

  & > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    text-aline: left;
    flex: 4;
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
    flex: 0.5;
    & > svg {
      path {
        fill: ${(props) => (props.hasMemoId ? "#E3E3E3" : "#646464")};
      }
    }
  }
`;

export default ReviewItem;
