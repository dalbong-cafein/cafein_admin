import Row from "./atoms/row";
import * as S from "../pages/style";
import { ReactComponent as Memo } from "../svg/memo.svg";

const ManagementTemp = ({
  temp,
  detailModal,
  setModal,
  setMemoId,
  setSelectItem,
}) => {
  return (
    <tbody>
      {temp &&
        temp.map((item, i) => (
          <tr key={i}>
            <td onClick={() => detailModal(item)}>
              <span>{String(item.storeId).padStart(6, "0")}</span>
            </td>
            <td onClick={() => detailModal(item)}>
              <Row gap={16} align={"center"}>
                {item.storeImageDto ? (
                  <S.Photo img={item.storeImageDto.imageUrl} />
                ) : (
                  <S.NonePic />
                )}
                <p>{item.storeName}</p>
              </Row>
            </td>
            <td onClick={() => detailModal(item)}>
              {item.address.fullAddress}
            </td>
            <td
              onClick={() => detailModal(item)}
              style={{ textAlign: "center" }}
            >
              {item.phone || "-"}
            </td>
            <td
              onClick={() => detailModal(item)}
              style={{ textAlign: "center" }}
            >
              {item.congestionScoreAvg || "-"}
            </td>
            <td onClick={() => detailModal(item)}>{item.reviewCnt}건</td>
            <td onClick={() => detailModal(item)}>
              {item.regDateTime.split("T")[0]}
            </td>
            <td onClick={() => detailModal(item)}>
              {item.modDateTime.split("T")[0]}
            </td>
            <td>
              <Memo
                onClick={() => {
                  setMemoId(item.memoId);
                  setSelectItem(item);
                  setModal(true);
                }}
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default ManagementTemp;
