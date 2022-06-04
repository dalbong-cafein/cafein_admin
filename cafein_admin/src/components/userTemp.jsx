import Row from "./atoms/row";
import styled from "styled-components";
import * as S from "../pages/style";
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
    <tbody>
      {temp &&
        temp
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((item, i) => (
            <tr key={i}>
              <td onClick={() => onModal(item)}>
                <div>{String(item.memberId).padStart(5, "0")}</div>
              </td>
              <td onClick={() => onModal(item)}>
                <p style={{ color: "#FC7521" }}>{item.socialTypeList[0]}</p>
                {item.socialTypeList[1] && <p>{item.socialTypeList[1]}</p>}
              </td>
              <td onClick={() => onModal(item)}>
                <Row gap={16} align={"center"}>
                  {item.memberImageDto ? (
                    <S.Photo img={item.memberImageDto.imageUrl} />
                  ) : (
                    <S.NonePic />
                  )}
                  <p>{item.nickname || "-"}</p>
                </Row>
              </td>
              <td onClick={() => onModal(item)}>{item.phone || "-"}</td>
              <td onClick={() => onModal(item)}>{item.email}</td>
              <td onClick={() => onModal(item)}>{item.app || "-"}</td>
              <td onClick={() => onModal(item)}>
                <Row gap={16}>
                  <p>{item.divice || "-"}</p>
                  <p>{item.ip || "-"}</p>
                </Row>
              </td>
              <td onClick={() => onModal(item)}>{item.regDateTime || "-"}</td>
              <td onClick={() => onModal(item)}>
                <Btn
                  content={
                    !item.isReported && !item.isDeleted
                      ? "기본"
                      : item.isReported
                      ? "신고"
                      : "탈퇴"
                  }
                >
                  {!item.isReported && !item.isDeleted
                    ? "기본"
                    : item.isReported
                    ? "신고"
                    : "탈퇴"}
                </Btn>
              </td>
              <td>
                <Memo
                  onClick={() => {
                    setSelectItem(item);
                    setMemoId(item.memoId);
                    setMemoModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
    </tbody>
  );
};

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
