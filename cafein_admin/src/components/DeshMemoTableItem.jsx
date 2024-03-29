import styled from "styled-components";
import Row from "./atoms/row";

const MemoItem = ({ item, memoClick }) => {
  function getTime() {
    const today = new Date();
    const timeValue = new Date(item?.modDateTime || item?.regDateTime);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <Box onClick={() => memoClick(item)}>
      <Row gap={10} style={{ padding: "10px 0" }}>
        <p style={{ color: "#f6f6f6" }}>
          {item.memoType}_
          {item.storeId || item.memberId || item.reviewId || item.couponId}
        </p>
        <p style={{ color: "#acacac", fontSize: "14px" }}>{getTime()}</p>
      </Row>
      <p style={{ color: "#acacac", fontSize: "14px", lineHeight: "19.6px" }}>
        {item.content
          ? item.content.length > 70
            ? `${item.content.slice(0, 70)}...`
            : item.content
          : "-"}
      </p>
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #515151;
  cursor: pointer;
`;

export default MemoItem;
