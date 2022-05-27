import Header from "../components/common/header";
import * as S from "./style";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Memo } from "../svg/memo.svg";
import MReview from "../components/common/modal/MReview";
import { reviewDataApi, reviewDetailApi } from "../util/review";
import None from "../components/None";

const Review = () => {
  useEffect(() => {
    reviewDataApi(page).then((res) => {
      setCount(res.data.data.reviewCnt);
      setTemp(res.data.data.reviewResDtoList.dtoList);
    });
  }, []);
  const [sort, setSort] = useState("DESC");
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);

  const [search, setSearch] = useState("");
  // pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [items, setItems] = useState(9);
  const [modal, setModal] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
    reviewDataApi(page, sort).then((res) => {
      setTemp(res.data.data.reviewResDtoList.dtoList);
    });
  };

  const onModal = (item) => {
    setModal(!modal);
    reviewDetailApi(item.reviewId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setSelectItem(item);
  };

  const sortData = (id) => {
    setSort(id);
    reviewDataApi(page, sort).then((res) => {
      setTemp(res.data.data.storeResDtoList.dtoList);
    });
  };
  return (
    <>
      <Header mcolor={"#fff"} text={"카페 리뷰"} subText={"등록된 리뷰 00건"} />
      <Row
        justify={"space-between"}
        align={"baseline"}
        style={{ marginBottom: "20px" }}
      >
        <Row gap={15}>
          <S.Sbtn id="DESC" onClick={(e) => sortData(e.target.id)}>
            최신순
          </S.Sbtn>
          <S.Sbtn id="ASC" onClick={(e) => sortData(e.target.id)}>
            오래된 순
          </S.Sbtn>
        </Row>
        <Row gap={15} align={"baseline"}>
          <Paging
            count={count}
            handlePageChange={handlePageChange}
            setPage={setPage}
            page={page}
          />
          <S.Sbtn>전체</S.Sbtn>
          <Row style={{ borderBottom: "1px solid #fff" }}>
            <S.Input
              placeholder="검색"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search onClick={onclick} />
          </Row>
        </Row>
      </Row>
      <S.Wrapper isNull={temp.length === 0}>
        <S.TableHeader>
          <tr>
            <td>분류</td>
            <td>리뷰 내용</td>
            <td>회원 번호</td>
            <td>카페 번호</td>
            <td>등록일</td>
            <td>최종 수정일</td>
            <td>메모</td>
          </tr>
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
                      <p>{String(item.writerId).padStart(5, "0")}</p>
                      <p>{item.nicknameOfWriter}</p>
                    </Row>
                  </td>
                  <td onClick={() => onModal(item)}>
                    <Row gap={16}>
                      <p>{String(item.storeId).padStart(5, "0")}</p>
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
                    <Memo />
                  </td>
                </tr>
              ))}
          </tbody>
        </S.TableHeader>
      </S.Wrapper>

      {temp.length === 0 && <None text={"리뷰"} />}
      {modal && <MReview setModal={setModal} selectItem={selectItem} />}
    </>
  );
};

export default Review;
