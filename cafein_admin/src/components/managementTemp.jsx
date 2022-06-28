import styled from "styled-components";
import Row from "./atoms/row";
import * as S from "../pages/style copy";
import { ReactComponent as Memo } from "../svg/memo.svg";

const ManagementTemp = ({
  temp,
  detailModal,
  setModal,
  setMemoId,
  setSelectItem,
}) => {
  return (
    <S.DataBox>
      {temp &&
        temp.map((item, i) => (
          <ItemRow key={i}>
            <div onClick={() => detailModal(item)}>
              {String(item.storeId).padStart(6, "0")}
            </div>
            <div onClick={() => detailModal(item)}>
              <Row gap={16} align={"center"} style={{ marginLeft: "16px" }}>
                {item.storeImageDto ? (
                  <S.Photo img={item.storeImageDto.imageUrl} />
                ) : (
                  <S.NonePic />
                )}
                <p>{item.storeName}</p>
              </Row>
            </div>
            <div onClick={() => detailModal(item)}>
              {item.address.fullAddress}
            </div>
            <div
              onClick={() => detailModal(item)}
              style={{ textAlign: "center" }}
            >
              {item.phone || "-"}
            </div>
            <div
              onClick={() => detailModal(item)}
              style={{ textAlign: "center" }}
            >
              {item.congestionScoreAvg || "-"}
            </div>
            <div onClick={() => detailModal(item)}>{item.reviewCnt}건</div>
            <div onClick={() => detailModal(item)}>
              {item.regDateTime.split("T")[0]}
            </div>
            <div onClick={() => detailModal(item)}>
              {item.modDateTime.split("T")[0]}
            </div>
            <div>
              <Memo
                onClick={() => {
                  setMemoId(item.memoId);
                  setSelectItem(item);
                  setModal(true);
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
    // padding: 0 0 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 18px;
    box-sizing: border-box;
    flex: 1;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3),
  div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    border-right: none;
    border-bottom: none;
  }
  & > div:nth-child(2) {
    justify-content: start;
  }
`;

export default ManagementTemp;
