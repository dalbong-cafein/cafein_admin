import { useEffect, useRef, useState } from "react";
import Row from "../components/atoms/row";
import None from "./None";
import * as S from "../pages/style";
import Paging from "../components/common/Pagination";
import * as SS from "./noticesStyle";
import { eventListApi } from "../util/events";
import styled from "styled-components";
import PVImg from "./common/PVImg";
import EventMapBox from "./eventMapBox";
import BPreview from "./common/modal/Bpreview";

const Event = () => {
  const [isActive, setIsActive] = useState(1);
  const [page, setPage] = useState(1);
  const [temp, setTemp] = useState([
    { date: "2022.03.28" },
    { date: "2022.03.28" },
    { date: "2022.03.28" },
    { date: "2022.03.28" },
    { date: "2022.03.28" },
    // { date: "2022.03.28" },
    // { date: "2022.03.28" },
    // { date: "2022.03.28" },
    // { date: "2022.03.28" },
    // { date: "2022.03.28" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "2페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
    // { date: "3페이지입니다" },
  ]);
  const [count, setCount] = useState(temp.length - 1);
  const [preview, setPreview] = useState(false);
  const [items, setItems] = useState(10);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };

  const [file, setFile] = useState();

  const onLoadFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    // eventListApi().then((res) => console.log(res));
  }, []);
  const input = useRef();
  return (
    <>
      <SS.Container>
        <div>
          <Row
            justify={"space-between"}
            align={"baseline"}
            style={{ marginBottom: "20px" }}
          >
            <Row gap={15}>
              <S.Sbtn onClick={() => setIsActive(2)} isTrue={isActive === 2}>
                최신순
              </S.Sbtn>
              <S.Sbtn onClick={() => setIsActive(3)} isTrue={isActive === 3}>
                오래된 순
              </S.Sbtn>
            </Row>

            <Paging
              count={count}
              handlePageChange={handlePageChange}
              setPage={setPage}
              page={page}
            />
          </Row>
          <EventMapBox temp={temp} items={items} page={page} i={0} />
          <EventMapBox temp={temp} items={items} page={page} i={2} />
          <EventMapBox temp={temp} items={items} page={page} i={4} />
          <EventMapBox temp={temp} items={items} page={page} i={6} />
          <EventMapBox temp={temp} items={items} page={page} i={8} />
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
            <SS.Btn back={"#2563eb"}>등록</SS.Btn>
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

export default Event;
