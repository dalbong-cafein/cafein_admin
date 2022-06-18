import Row from "./atoms/row";
import * as S from "../pages/style copy";
import { ReactComponent as Memo } from "../svg/memo.svg";

const ManagementTemp = ({
  // temp,
  detailModal,
  setModal,
  setMemoId,
  setSelectItem,
}) => {
  const temp = [
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
    {
      storeId: 1,
      address: { fullAddress: "어쩌구" },
      storeName: "카페카페",
      phone: "01012345678",
      congestionScoreAvg: "22",
      regDateTime: "2020.06.23",
      modDateTime: "2020.06.23",
    },
  ];
  return (
    <S.DataBox>
      {temp &&
        temp.map((item, i) => (
          <S.ItemRow key={i}>
            <div onClick={() => detailModal(item)}>
              <span>{String(item.storeId).padStart(6, "0")}</span>
            </div>
            <div onClick={() => detailModal(item)}>
              <Row gap={16} align={"center"}>
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
          </S.ItemRow>
        ))}
    </S.DataBox>
  );
};

export default ManagementTemp;
