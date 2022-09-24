import styled from "styled-components";
import { useState, useEffect } from "react";

import * as S from "./style copy";
import * as SS from "../components/noticesStyle";

import SelectHeader from "../components/common/SelectHeader";

import { registerNotice } from "../recoil/NNotice";
import { postDelApi, registerNoticeApi, eventListApi } from "../util/events";
import { useRecoilState } from "recoil";
import Alert from "../components/modal/Alert";
import None from "../components/common/None";
import NoticePreview from "../components/modal/NoticePreview";
import RedAlert from "../components/modal/RedAlert";
import NoticeDetailModal from "../components/modal/NoticeDetailModal";
import usePagination from "../hooks/usePagination";
import FilterRow from "../components/common/FilterRow";
import RegNoticeBox from "../components/RegNoticeBox";

const QnAs = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] =
    usePagination();

  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [Dalert, setDAlert] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  const [preview, setPreview] = useState(false);
  const [register, setRegister] = useRecoilState(registerNotice);

  const onSubmit = (register) => {
    registerNoticeApi(register)
      .then((res) => {
        setAlert(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onDel = () => {
    postDelApi(selectItem.boardId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const copy = { ...register };
    copy.boardCategoryId = 2;
    setRegister(copy);
    eventListApi(page, sort).then((res) => {
      setCount(res.data.data.boardCnt);
      setData(res.data.data.boardResDtoList.dtoList);
    });
  }, [sort, page]);
  return (
    <>
      <SelectHeader
        menu="qna"
        menu1="notice"
        menu2="qna"
        Tmenu1="공지사항"
        Tmenu2="자주 묻는 질문"
      />
      <SS.Container>
        <div>
          <FilterRow
            sort={sort}
            count={count}
            page={page}
            item={item}
            onAsc={onAsc}
            onDesc={onDesc}
            setPage={setPage}
            search={search}
            setSearch={setSearch}
            nodrop
          />
          <S.Wrapper isNull={data.length === 0}>
            <TableHeader>
              <div>분류</div>
              <div>제목</div>
              <div>등록일</div>
            </TableHeader>
            {data
              .slice(item * (page - 1), item * (page - 1) + item)
              .map((item, i) => (
                <ItemRow
                  key={i}
                  onClick={() => {
                    setModal(true);
                    setSelectItem(item);
                  }}
                >
                  <div>{String(item.boardId).padStart(6, "0")}</div>
                  <div>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      {item.title}
                    </p>
                    <p>
                      {item.content.length > 30
                        ? `${item.content.slice(0, 30)}...`
                        : item.content}
                    </p>
                  </div>

                  <div>{String(item.regDateTime).split("T")[0]}</div>
                </ItemRow>
              ))}
          </S.Wrapper>
          {data.length == 0 && <None text="QnA" />}
        </div>
        <RegNoticeBox
          register={register}
          setRegister={setRegister}
          setPreview={setPreview}
          setAlert={setAlert}
          title="새 자주 묻는 질문 등록"
        />
      </SS.Container>
      {alert && (
        <Alert
          setAlert={setAlert}
          text="자주 묻는 질문 등록"
          subtext="게시물을 등록하시겠습니까?"
          func={onSubmit}
          forFunc={register}
        />
      )}
      {preview && (
        <NoticePreview
          item={register}
          setModal={setPreview}
          file={register.imageFiles}
          menu="QnA"
        />
      )}
      {modal && (
        <NoticeDetailModal
          selectItem={selectItem}
          setModal={setModal}
          menu="QnA"
          setAlert={setDAlert}
        />
      )}
      {Dalert && (
        <RedAlert
          text="자주 묻는 질문 삭제"
          text1="자주 묻는 질문을 "
          text2="삭제"
          text3="하시겠습니까?"
          setAlert={setDAlert}
          func={onDel}
          forFunc={null}
        />
      )}
    </>
  );
};

const TableHeader = styled.div`
  font-size: 14px;
  display: flex;
  width: 100%;
  color: #8b8b8b;
  text-align: center;
  line-height: 42px;
  border-bottom: 1px solid #515151;
  & > div {
    flex: 0.5;
    border-right: 1px solid #515151;
  }
  & div:nth-child(2) {
    flex: 2.5;
  }

  & > div:last-child {
    flex: 1;
    border-right: none;
  }
`;

const ItemRow = styled.div`
  display: flex;
  color: #e3e3e3;
  height: calc(65vh / 9);
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #515151;
  & > div {
    // padding: 0 0 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    line-height: 18px;
    box-sizing: border-box;
    flex: 0.5;
    border-right: 1px solid #515151;
  }

  & div:nth-child(2) {
    flex: 2.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    & > p {
      margin: 0 0 0 16px;
    }
  }

  & > div:last-child {
    flex: 1;
    border-right: none;
    border-bottom: none;
  }
`;

export default QnAs;
