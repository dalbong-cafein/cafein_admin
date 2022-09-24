import { ReactComponent as Memo } from "../svg/memo.svg";
import * as S from "../pages/style copy";
import styled from "styled-components";

const MarketingsItem = ({
  data,
  setAlert,
  setReportId,
  setSelectItem,
  setMemoModal,
  setMemoItem,
  page,
  alert,
}) => {
  const changeState = (id, state) => {
    if (!state) {
      setAlert(!alert);
      setReportId(id);
    }
  };
  return (
    <S.DataBox>
      {data &&
        data.slice((page - 1) * 9, (page - 1) * 9 + 10).map((item, i) => (
          <ItemRow key={i}>
            <div>{String(item.couponId).padStart(6, "0")}</div>
            <div>{item.brandName}</div>
            <div>{item.itemName}</div>
            <div>{String(item.memberId).padStart(6, "0")}</div>
            <div>{item.phone || "-"}</div>
            <div>{String(item.regDateTime).split("T")[0]}</div>
            <div>{String(item.processingDateTime).split("T")[0] || "-"}</div>
            <div>
              <S.Btn
                content={item.status}
                onClick={() => {
                  changeState(item.couponId, item.state);
                }}
              >
                {item.processingDateTime !== null ? "완료" : "미완료"}
              </S.Btn>
            </div>
            <div>
              <Memo
                onClick={() => {
                  setSelectItem(item);
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
  // flex: 1;
  height: calc(65vh / 9);
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
  & > div:nth-child(3) {
    flex: 2;
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

export default MarketingsItem;
