import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Paging from "../components/common/Pagination";
import { useNavigate } from "react-router-dom";

import * as S from "../pages/style";
<<<<<<< HEAD
import * as SS from "../conponents/noticesStyle";
=======
import * as SS from "../../conponents/noticesStyle";
>>>>>>> 0b823846205a2f1c53329faf4a574691982a54bf

import { eventImgApi, regImgApi } from "../util/events";

import { ReactComponent as Check } from "../svg/check.svg";

import BPreview from "../components/common/modal/Bpreview";
import PVImg from "../components/common/PVImg";
import SelectHeader from "../components/common/SelectHeader";
import Row from "../components/atoms/row";
import None from "../components/None";
import EventMapBox from "../components/eventMapBox";

const Events = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("DESC");
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(10);

  const [temp, setTemp] = useState([]);
  const [preview, setPreview] = useState(false);

  const [file, setFile] = useState();

  const handlePageChange = (page) => {
    setPage(page);
  };

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
        .then((res) => {
          loadData();
          setFile();
        })
        .catch((err) => console.log(err));
    }
  };

  const sortData = (id) => {
    setSort(id);
  };

  const loadData = () => {
    eventImgApi(page, sort)
      .then((res) => {
        setTemp(res.data.data.eventResDtoList.dtoList);
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
        menu={"event"}
        menu1={"marketing"}
        menu2={"event"}
        Tmenu1={"마케팅 서비스"}
        Tmenu2={"이벤트"}
      />
      <SS.Container>
        <div>
          <Row
            justify={"space-between"}
            align={"baseline"}
            style={{ marginBottom: "20px" }}
          >
            <Row gap={15}>
              <S.Sbtn id="DESC" onClick={(e) => sortData(e.target.id)}>
                최신순
                {sort === "DESC" && <Check />}
              </S.Sbtn>
              <S.Sbtn id="ASC" onClick={(e) => sortData(e.target.id)}>
                오래된 순{sort === "ASC" && <Check />}
              </S.Sbtn>
            </Row>

            <Paging
              count={count}
              handlePageChange={handlePageChange}
              setPage={setPage}
              page={page}
            />
          </Row>
          {temp && (
            <>
              <EventMapBox
                temp={temp}
                items={items}
                page={page}
                i={0}
                loadData={loadData}
              />
              <EventMapBox
                temp={temp}
                items={items}
                page={page}
                i={2}
                loadData={loadData}
              />
              <EventMapBox
                temp={temp}
                items={items}
                page={page}
                i={4}
                loadData={loadData}
              />
              <EventMapBox
                temp={temp}
                items={items}
                page={page}
                i={6}
                loadData={loadData}
              />
              <EventMapBox
                temp={temp}
                items={items}
                page={page}
                i={8}
                loadData={loadData}
              />
            </>
          )}

          {temp.length === 0 && <None text={"마케팅 서비스"} />}
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
                {" "}
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
          <Row gap={16} justify={"end"}>
            <SS.Btn back={"#515151"} onClick={() => setPreview(true)}>
              미리보기
            </SS.Btn>
            <SS.Btn back={"#2563eb"} onClick={regImg}>
              등록
            </SS.Btn>
          </Row>
        </SS.NewNotice>
      </SS.Container>
      {preview && <BPreview setModal={setPreview} item={file} />}
    </>
  );
};
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

export default Events;
