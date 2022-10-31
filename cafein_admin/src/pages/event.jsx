import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import * as SS from "../components/noticesStyle";
import * as S from "./style copy";

import { eventImgApi, regImgApi } from "../util/events";

import EventPreview from "../components/modal/EventPreview";
import PVImg from "../components/common/PVImg";
import SelectHeader from "../components/common/SelectHeader";
import Row from "../components/atoms/row";
import EventMapBoxs from "../components/EventMapBox";
import usePagination from "../hooks/usePagination";
import FilterRow from "../components/common/FilterRow";
import { adminFeedListForEventApi } from "../util/desh";
import { resizeImg } from "../constant/resizeImg";
import Paging from "../components/common/Pagination";

const Events = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const [nowBanner, setNowBanner] = useState();
  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] = usePagination(10);
  const [noticeId, setNoticeId] = useState("");
  const [
    pageForNotice,
    sortForNotice,
    itemForNotice,
    countForNotice,
    setCountForNotice,
    setPageForNotice,
    onDescForNotice,
    onAscForNotice,
  ] = usePagination(4);

  const [preview, setPreview] = useState(false);

  const handlePageChangeForNotice = (page) => {
    setPageForNotice(page);
  };
  const [file, setFile] = useState();

  const onLoadFile = async (e) => {
    if (file) {
      alert("이미지는 하나만 등록해주세요");
    }
    if (e.target.files[0]) {
      const file = await resizeImg(e.target.files[0]);
      setFile(file);
    }
  };
  const regImg = () => {
    if (!file) {
      window.alert("첨부파일이 없습니다.");
    } else {
      regImgApi({ file: file, id: noticeId })
        .then(() => {
          loadData();
          setFile();
        })
        .catch((err) => console.log(err));
    }
  };

  const loadData = () => {
    eventImgApi(page, sort)
      .then((res) => {
        setNowBanner(res.data.data.currentEventResDto);
        setData(res.data.data.eventResDtoList.dtoList);
        setCount(res.data.data.eventCnt);
      })
      .catch((err) => {
        console.log(err);
        window.alert("나중에 다시 시도해주세요");
        navigate("/");
      });
  };
  useEffect(() => {
    adminFeedListForEventApi(pageForNotice, sortForNotice, false).then((res) => {
      console.log(res);
      setCountForNotice(res.data.data.boardCnt);
      setNoticeData(res.data.data.boardResDtoList.dtoList);
    });
  }, [pageForNotice]);

  useEffect(() => {
    loadData();
  }, [page, sort]);
  const input = useRef();
  return (
    <>
      <SelectHeader
        menu="event"
        menu1="marketing"
        menu2="event"
        Tmenu1="마케팅 서비스"
        Tmenu2="이벤트"
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
          {data && (
            <EventMapBoxs
              data={data}
              item={item}
              page={page}
              loadData={loadData}
              nowBanner={nowBanner}
            />
          )}
        </div>
        <SS.NewNotice
          style={{
            backgroundColor: "#222222",
            borderRadius: "16px",
            padding: "20px 16px",
            gap: "16px",
          }}
        >
          <p style={{ color: "#e3e3e3" }}>새 배너 등록</p>
          <Card>
            <S.Wrapper
              isNull={noticeData.length === 0}
              style={{ border: 0, backgroundColor: "#333333" }}
            >
              <S.DataBox style={{ height: "32vh" }}>
                {noticeData &&
                  noticeData.map((item, i) => (
                    <ItemRow key={i} onClick={() => setNoticeId(() => item.boardId)}>
                      <div>{String(item.boardId).padStart(6, "0")}</div>

                      <div>
                        {item.boardImageDtoList[0] ? (
                          <Photo img={item.boardImageDtoList[0].imageUrl} />
                        ) : (
                          <NonePic />
                        )}
                        <div>
                          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{item.title}</p>
                          <p>
                            {item.content.length > 30
                              ? `${item.content.slice(0, 30)}...`
                              : item.content}
                          </p>
                        </div>
                      </div>

                      <div>{String(item.regDateTime).split("T")[0]}</div>
                    </ItemRow>
                  ))}
              </S.DataBox>
              <Paging
                count={countForNotice}
                handlePageChange={handlePageChangeForNotice}
                page={pageForNotice}
                item={itemForNotice}
              />
            </S.Wrapper>
          </Card>
          <Card>
            <p>배너와 연결할 공지사항</p>
            <input
              placeholder="공지사항 번호를 입력해 주세요"
              value={noticeId}
              onChange={(e) => {
                setNoticeId(e.target.value);
              }}
            />
          </Card>
          <Card>
            <p>이미지 첨부</p>
            <AttachBox>
              {file ? (
                <ImgBox>
                  <PVImg img={file} />
                </ImgBox>
              ) : (
                <>
                  <InputBox
                    onClick={() => {
                      input.current?.click();
                    }}
                  >
                    <p>이미지를 선택하세요</p>
                    <input
                      ref={input}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => onLoadFile(e)}
                    />
                  </InputBox>
                </>
              )}
            </AttachBox>
          </Card>

          <Row gap={16} justify="end">
            <SS.Btn back="#515151" onClick={() => setPreview(true)}>
              미리보기
            </SS.Btn>
            <SS.Btn back="#2563eb" onClick={regImg}>
              등록
            </SS.Btn>
          </Row>
        </SS.NewNotice>
      </SS.Container>
      {preview && <EventPreview setModal={setPreview} item={file} />}
    </>
  );
};

const InputBox = styled.div`
  border: 1px dotted #acacac;
  border-radius: 8px;
  height: 72px;
  margin: 0 auto;
  padding: 0 95px;
  line-height: 72px;
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
  border-radius: 4px;
`;

const ImgBox = styled.div`
  border-radius: 8px;
  width: 328px;
  max-height: 72px;
  margin: 0 auto;
  height: 72px;
`;
const AttachBox = styled.div`
  background-color: #333333;
  border-radius: 8px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemRow = styled.div`
  display: flex;
  color: #e3e3e3;
  height: calc(32vh / 4);
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
    flex: 1;
  }

  & div:nth-child(2) {
    flex: 2.5;
    width: 100%;
    display: flex;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: start;
      & > p {
        margin: 0 0 0 16px;
      }
    }
  }
`;

const Card = styled.div`
  background-color: #333333;
  border-radius: 16px;
  padding: 16px;
  & > input {
    width: 100%;
    border: 0;
    height: 32px;
    margin-top: 16px;
    border-bottom: 1px solid #515151;
    background-color: #333333;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
`;

const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
`;
export default Events;
