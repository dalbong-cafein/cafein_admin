import { useState } from "react";
import styled from "styled-components";
import Row from "../components/atoms/row";
import Sbtn from "../components/atoms/Sbtn";

import Paging from "../components/common/Pagination";

const ManagementCafe = () => {
  const [isActive, setIsActive] = useState(1);
  const temp = [
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 여기저기어쩌구",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 ddddddddddd",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 ddddddddddddd",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 여기저기어쩌구",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
    },
    {
      code: "000001",
      name: "투썸플레이스 은평구청점",
      location: "위치어쩌구저쩌구 kkkkk",
      phoneNum: "0-1234-2345",
      congestion: "여유",
      review: "245",
      registration: "03/29/2022",
      edited: "03/29/2022",
      memo: "",
    },
  ];

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 2 - 1);
  const [items, setItems] = useState(5);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  return (
    <>
      <Row align={"baseline"} style={{ marginBottom: "20px" }} gap={15}>
        <Sbtn onClick={() => setIsActive(1)} isTrue={isActive === 1}>
          새 카페 등록
        </Sbtn>
        <Sbtn onClick={() => setIsActive(2)} isTrue={isActive === 2}>
          최신순
        </Sbtn>
        <Sbtn onClick={() => setIsActive(3)} isTrue={isActive === 3}>
          오래된 순
        </Sbtn>
        <Paging
          count={count}
          handlePageChange={handlePageChange}
          setPage={setPage}
          page={page}
        />
      </Row>
      <Wrapper>
        <TableHeader>
          <tr height="40px">
            <td>분류</td>
            <td>카페명</td>
            <td>위치</td>
            <td>연락처</td>
            <td>혼잡도</td>
            <td>리뷰</td>
            <td>등록일</td>
            <td>최종 수정일</td>
            <td>메모</td>
          </tr>

          {temp
            .concat(temp)
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item) => (
              <tr height="120px">
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.phoneNum}</td>
                <td>{item.congestion}</td>
                <td>{item.review}건</td>
                <td>{item.registration}</td>
                <td>{item.edited}</td>
                <td>{item.memo}</td>
              </tr>
            ))}
        </TableHeader>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid #444444;
`;

const TableHeader = styled.table`
  text-align: center;
  font-size: 14px;
  color: #e3e3e3;
  width: 100%;

  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;

  & > th,
  td {
    padding: 8px;
    border: 1px solid #444444;
  }
  & > tr:first-child {
    color: #8b8b8b;
  }
`;

export default ManagementCafe;
