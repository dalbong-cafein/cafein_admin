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
  setMemoItem,
  alert,
}) => {
  const changeState = (id, state) => {
    if (!state) {
      console.log("hi");
      setAlert(!alert);
      setReportId(id);
    }
  };
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
                  onClick={() => {
                    changeState(item.couponId, item.state);
                  }}
                >
                  {item.processingDateTime !== null ? "완료" : "미완료"}
                </S.Btn>
              </td>
              <td>
                <Memo
                  onClick={() => {
                    setSelectItem(item);
                    setMemoItem(item);
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
