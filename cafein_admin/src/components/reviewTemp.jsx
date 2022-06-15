import Row from "./atoms/row";
import * as S from "../pages/style";
import { ReactComponent as Memo } from "../svg/memo.svg";
const ReviewTemp = ({
  temp,
  onModal,
  setSelectItem,
  setMemoModal,
  setMemoId,
}) => {
  return (
    <tbody>
      {temp &&
        temp.map((item, i) => (
          <tr key={i}>
            <td onClick={() => onModal(item)}>{item.reviewId}</td>
            <td onClick={() => onModal(item)}>
              <Row gap={16} align={"center"}>
                {item.reviewImageDto ? (
                  <S.Photo img={item.reviewImageDto.imageUrl} />
                ) : (
                  <S.NonePic />
                )}
                <p style={{ textAlign: "left", width: "200px" }}>
                  {item.content
                    ? item.content.length > 80
                      ? `${item.content.slice(0, 80)}...`
                      : item.content
                    : "-"}
                </p>
              </Row>
            </td>
            <td onClick={() => onModal(item)}>
              <Row gap={16}>
                <p>{String(item.writerId).padStart(6, "0")}</p>
                <p>{item.nicknameOfWriter}</p>
              </Row>
            </td>
            <td onClick={() => onModal(item)}>
              <Row gap={16}>
                <p>{String(item.storeId).padStart(6, "0")}</p>
                <p>{item.storeName}</p>
              </Row>
            </td>
            <td onClick={() => onModal(item)}>
              {item.regDateTime.split("T")[0]}
            </td>
            <td onClick={() => onModal(item)}>
              {item.modDateTime.split("T")[0]}
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
export default ReviewTemp;
