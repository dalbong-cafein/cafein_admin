import Row from "./atoms/row";
import * as S from "../pages/style copy";
import styled from "styled-components";
import { ReactComponent as Memo } from "../svg/memo.svg";
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
          <ItemRow key={i}>
            <div onClick={() => onModal(item)}>
              {String(item.reviewId).padStart(6, "0")}
            </div>
            <div onClick={() => onModal(item)}>
              <Row gap={16} align={"center"} style={{ marginLeft: "16px" }}>
                {item.reviewImageDto ? (
                  <S.Photo img={item.reviewImageDto.imageUrl} />
                ) : (
                  <S.NonePic />
                )}
                <p style={{ textAlign: "left", width: "300px" }}>
                  {item.content
                    ? item.content.length > 80
                      ? `${item.content.slice(0, 80)}...`
                      : item.content
                    : "-"}
                </p>
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
    flex: 1;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(2) {
    flex: 3;
  }

  & > div:nth-child(4) {
    flex: 1.5;
  }
  & > div:last-child {
    border-right: none;
    border-bottom: none;
  }
  & > div:nth-child(2) {
    justify-content: start;
  }
`;

export default ReviewTemp;
