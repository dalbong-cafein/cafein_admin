import Row from "./atoms/row";
import styled from "styled-components";
import * as S from "../pages/style copy";
import { ReactComponent as Memo } from "../svg/memo.svg";

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
        temp
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((item, i) => (
            <ItemRow key={i}>
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
              <div onClick={() => onModal(item)}>{item.regDateTime || "-"}</div>
              <div onClick={() => onModal(item)}>
                <Btn
                  content={
                    item.memberState === "NORMAL"
                      ? "기본"
                      : item.memberState === "SUSPENSION"
                      ? "신고"
                      : "탈퇴"
                  }
                >
                  {item.memberState === "NORMAL"
                    ? "기본"
                    : item.memberState === "SUSPENSION"
                    ? "신고"
                    : "탈퇴"}
                </Btn>
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
`;

const Btn = styled.div`
  background-color: ${(props) =>
    props.content === "기본"
      ? "#26BA6A"
      : props.content === "신고"
      ? "#f44336"
      : "#ff9800"};
  width: 86px;
  height: 26px;
  text-align: center;
  margin: 0 auto;
  opacity: 0.3;

  border-radius: 6px;
  color: #fff;
  line-height: 26px;
`;
export default UserTemp;
