import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import * as SS from "../components/noticesStyle";

import { eventImgApi, regImgApi } from "../util/events";

import EventPreview from "../components/modal/EventPreview";
import PVImg from "../components/common/PVImg";
import SelectHeader from "../components/common/SelectHeader";
import Row from "../components/atoms/row";
import None from "../components/common/None";
import EventMapBoxs from "../components/EventMapBox";
import usePagination from "../hooks/usePagination";
import FilterRow from "../components/common/FilterRow";

const Events = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  // pagination
  const [page, sort, item, count, setCount, setPage, onDesc, onAsc] =
    usePagination(10);

  const [preview, setPreview] = useState(false);

  const [file, setFile] = useState();

  const onLoadFile = (e) => {
    if (file) {
      alert("이미지는 하나만 등록해주세요");
    }
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const regImg = () => {
    if (!file) {
      window.alert("첨부파일이 없습니다.");
    } else {
      regImgApi(file)
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
            />
          )}

          {data.length === 0 && <None text="마케팅 서비스" />}
        </div>
        <SS.NewNotice>
          <p>새 배너 등록</p>
          <AttachBox>
            <p>첨부</p>
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
  position: absolute;
  transform: translate(45%, 25%);
  border: 1px dotted #acacac;
  border-radius: 8px;
  height: 72px;
  margin: 0 auto;
  padding: 0 95px;
  line-height: 72px;
`;

const ImgBox = styled.div`
  position: absolute;
  transform: translate(45%, 25%);
  border-radius: 8px;
  width: 328px;
  max-height: 72px;
  margin: 0 auto;
  height: 72px;
`;
const AttachBox = styled.div`
  background-color: #333333;
  margin-top: 30px;
  border-radius: 8px;
  width: 100%;
  height: 104px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  & > p {
    font-weight: 500;
    color: #acacac;
    padding: 12px 16px;
  }
`;

export default Events;
