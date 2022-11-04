import styled from "styled-components";

import { ReactComponent as Memo } from "../svg/memo.svg";
import { ReactComponent as Check } from "../svg/ArrowDown.svg";

import { changeReportStatusApi } from "../util/events";
import { useState } from "react";
import RedAlert from "./modal/RedAlert";

export default function ReportItem({ onModal, loadData, item, setMemoItem, setModalMemo }) {
  const [alert, setAlert] = useState(false);
  const [selectState, setSelectState] = useState(null);
  const [dropData, setDropData] = useState({ item: null, isDrop: false });
  const statusObj = {
    APPROVAL: "승인",
    REJECT: "반려",
    WAIT: "대기",
    대기: "WAIT",
    반려: "REJECT",
    승인: "APPROVAL",
  };
  const statusArrKr = ["승인", "반려", "대기"];
  const changeState = () => {
    const state = selectState == "반려" ? "reject" : "approve";
    changeReportStatusApi(item.reportId, state)
      .then((res) => {
        setAlert(() => false);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const onClickStatusBtn = () => {
    const copy = { ...dropData };
    copy.isDrop = true;
    copy.item = item;
    setDropData(() => copy);
  };

  const onClickStatusItem = (status) => {
    const copy = { ...dropData };
    copy.isDrop = false;
    setDropData(copy);
    setSelectState(() => status);
    setAlert(() => true);
  };

  const itemStatus = statusObj[item.reportStatus];

  return (
    <>
      <ItemRow hasMemoId={item.memoId}>
        <div onClick={() => onModal(item)}>{String(item.reportId).padStart(6, "0")}</div>
        <div onClick={() => onModal(item)}>
          <p
            style={{
              marginBottom: "5px",
              overflow: "hidden",
              width: "100%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {item.categoryName}
          </p>
        </div>

        <div onClick={() => onModal(item)}>{String(item.reviewId).split("T")[0] || "-"}</div>
        <div onClick={() => onModal(item)}>{String(item.fromMemberId).split("T")[0] || "-"}</div>
        <div onClick={() => onModal(item)}>{String(item.regDateTime).split("T")[0] || "-"}</div>
        <div onClick={() => onModal(item)}>
          <Btn
            content={item.reportStatus}
            onClick={() => {
              if (item.reportStatus == "WAIT") {
                onClickStatusBtn();
              }
            }}
          >
            <div />
            {itemStatus}
            {item.reportStatus === "WAIT" && (
              <Check style={{ paddingBottom: "2px", paddingLeft: "3px" }} />
            )}
          </Btn>
          {dropData.isDrop && (
            <DropBox>
              {statusArrKr
                .filter((item) => item != statusObj[dropData.item.reportStatus])
                .map((item, i) => (
                  <Item key={i} onClick={() => onClickStatusItem(item)}>
                    {item}
                  </Item>
                ))}
            </DropBox>
          )}
        </div>
        <div>
          <Memo
            onClick={() => {
              setMemoItem(item);
              setModalMemo(true);
            }}
          />
        </div>
      </ItemRow>
      {alert && (
        <RedAlert
          text="상태 변경"
          text1=""
          text2={`'${selectState}'`}
          text3="로 상태를 변경하시겠습니까?"
          setAlert={setAlert}
          func={changeState}
          forFunc={null}
        />
      )}
    </>
  );
}

const DropBox = styled.div`
  max-width: 90px;
  height: 70px;
  border-radius: 8px;
  background-color: #646464;
  position: absolute;
  box-sizing: border-box;
  transform: translate(0, 50px);
  padding: 8px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const Item = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #fff;
  padding: 8px 30px;
  cursor: pointer;
`;

const ItemRow = styled.div`
  display: flex;
  color: #e3e3e3;
  height: calc(65vh / 9);
  cursor: pointer;
  border-bottom: 1px solid #515151;
  font-size: 14px;
  & > div {
    // padding: 0 0 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    line-height: 18px;
    box-sizing: border-box;
    flex: 1;
    border-right: 1px solid #515151;
  }

  & div:nth-child(2) {
    flex: 2.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    & > p {
      margin: 0 0 0 16px;
    }
  }

  & > div:nth-child(7) {
    border-right: none;
    border-bottom: none;
    & > svg {
      path {
        fill: ${(props) => (props.hasMemoId ? "#E3E3E3" : "#646464")};
      }
    }
  }
`;

const Btn = styled.div`
  position: relative;
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  border-radius: 6px;
  color: ${(props) =>
    props.content === "APPROVAL" ? "#26BA6A" : props.content === "REJECT" ? "#f44336" : "#ff9800"};
  line-height: 26px;
  & > div:first-child {
    position: absolute;
    width: 86px;
    height: 26px;
    background-color: ${(props) =>
      props.content === "APPROVAL"
        ? "#26BA6A"
        : props.content === "REJECT"
        ? "#f44336"
        : "#ff9800"};
    opacity: 0.3;
    border-radius: 4px;
  }
`;
