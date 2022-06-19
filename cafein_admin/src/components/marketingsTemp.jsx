import { ReactComponent as Memo } from "../svg/memo.svg";
import * as S from "../pages/style";

const MarketingsTemp = ({
  temp,
  page,
  items,
  setAlert,
  setReportId,
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
              <td>{String(item.couponId).padStart(6, "0")}</td>
              <td>{item.brandName}</td>
              <td>{item.itemName}</td>
              <td>{String(item.memberId).padStart(6, "0")}</td>
              <td>{item.phone || "-"}</td>
              <td>{item.regDateTime}</td>
              <td>{item.processingDateTime || "-"}</td>
              <td>
                <S.Btn
                  content={item.status}
                  disabled={item.status}
                  onClick={() => {
                    setAlert(!alert);
                    setReportId(item.couponId);
                  }}
                >
                  {item.processingDateTime !== null ? "완료" : "미완료"}
                </S.Btn>
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

export default MarketingsTemp;
