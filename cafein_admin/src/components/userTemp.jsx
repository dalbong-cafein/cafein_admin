import Row from "./atoms/row";
import styled from "styled-components";
import * as S from "../pages/style copy";
import { ReactComponent as Memo } from "../svg/memo.svg";
import StateBtn from "./atoms/btn";

const UserTemp = ({
  temp,
  page,
  items,
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
              {String(item.memberId).padStart(6, "0")}
            </div>
            <div onClick={() => onModal(item)}>
              <p style={{ color: "#FC7521" }}>{item.socialTypeList[0]}</p>
              {item.socialTypeList[1] && <p>{item.socialTypeList[1]}</p>}
            </div>
            <div onClick={() => onModal(item)}>
              <Row gap={16} align={"center"} style={{ marginLeft: "16px" }}>
                {item.memberImageDto ? (
                  <S.Photo img={item.memberImageDto.imageUrl} />
                ) : (
                  <S.NonePic />
                )}
                <p>{item.nickname || "-"}</p>
              </Row>
            </div>
            <div onClick={() => onModal(item)}>{item.phone || "-"}</div>
            <div onClick={() => onModal(item)}>{item.email}</div>
            <div onClick={() => onModal(item)}>{item.app || "-"}</div>
            <div onClick={() => onModal(item)}>
              <Row gap={16}>
                <p>{item.divice || "-"}</p>
                <p>{item.ip || "-"}</p>
              </Row>
            </div>
            <div onClick={() => onModal(item)}>
              {String(item.regDateTime).split("T")[0] || "-"}
            </div>
            <div onClick={() => onModal(item)}>
              <StateBtn content={item.memberState} />
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
  height: 55px;
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
    flex: 0.5;
    border-right: 1px solid #515151;
  }
  & > div:nth-child(3),
  div:nth-child(5) {
    flex: 2;
  }
  & > div:nth-child(4),
  div:nth-child(7),
  div:nth-child(8) {
    flex: 0.9;
  }

  & > div:nth-child(9) {
    flex: 1.2;
  }
  & > div:last-child {
    border-right: none;
    border-bottom: none;
  }
  & > div:nth-child(3) {
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

export default UserTemp;
