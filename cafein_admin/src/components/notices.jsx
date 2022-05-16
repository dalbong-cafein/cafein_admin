import { useState, useRef } from "react";

import * as S from "../pages/style";
import * as SS from "./noticesStyle";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Square } from "../svg/square.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";
import "react-datepicker/dist/react-datepicker.css";

import PVImg from "../components/common/PVImg";
import Alert from "./common/modal/alert";
import DatePicker from "react-datepicker";

const Notices = () => {
  const temp = [
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
  ];
  const [menu, setMenu] = useState("Notice");
  const [picker, setPicker] = useState(false);

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 3 - 1);
  const [items, setItems] = useState(10);
  const [alert, setAlert] = useState(false);
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  const [file, setFile] = useState([]);
  const onLoadFile = (e) => {
    let copy = [...file];
    if (copy.length >= 5) {
      window.alert("이미지는 5개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        copy = [...copy, e.target.files[0]];
        setFile(copy);
      }
    }
  };
  const deleteImg = (idx) => {
    let copy = [...file];
    copy.splice(idx, 1);
    setFile(copy);
  };
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
            <Row gap={15} align={"baseline"}>
              <Paging
                count={count}
                handlePageChange={handlePageChange}
                setPage={setPage}
                page={page}
              />
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
          <S.Wrapper>
            <S.TableHeader>
              <tr>
                <td>분류</td>
                <td>제목</td>
                <td>PUSh</td>
                <td>등록일</td>
              </tr>
              <>
                {temp
                  .concat(temp)
                  .concat(temp)
                  .slice(items * (page - 1), items * (page - 1) + items)
                  .map((item) => (
                    <tr style={{ maxHeight: "72px" }}>
                      <td>{item.code}</td>
                      <td style={{ textAlign: "left" }}>
                        <p style={{ fontWeight: "bold" }}>{item.title}</p>
                        <p>
                          {item.content.length > 30
                            ? item.content.slice(0, 30)
                            : item.content}
                        </p>
                      </td>
                      <td>{item.push === "" ? "-" : item.push}</td>
                      <td>{item.registration}</td>
                    </tr>
                  ))}
              </>
            </S.TableHeader>
          </S.Wrapper>
        </div>
        <SS.NewNotice>
          <p>새 공지 등록</p>

          <div>
            <SS.Input>
              <p onClick={() => setPicker(!picker)}>날짜</p>
              {picker && <DatePickerComponent />}
            </SS.Input>

            <SS.Input>
              <p>제목</p>
              <input type="text" />
            </SS.Input>
            <SS.TextBox>
              <textarea cols="50" rows="20" placeholder="내용을 입력하세요" />

              <SS.PhotoBox>
                <SS.FileUpload
                  onClick={() => {
                    input.current?.click();
                  }}
                >
                  <Photo />
                  <div>{file.length}/5</div>
                  <input
                    ref={input}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => onLoadFile(e)}
                  />
                </SS.FileUpload>
                {file?.map((a, i) => {
                  return (
                    <SS.ImgBox key={i}>
                      <CloseIcon name={a.name} onClick={() => deleteImg(i)} />
                      <PVImg img={a} />
                    </SS.ImgBox>
                  );
                })}
              </SS.PhotoBox>
            </SS.TextBox>
          </div>
          <Row gap={115} justify={"space-between"} align={"baseline"}>
            <SS.CheckPush>
              <Square />
              <p>App Push</p>
            </SS.CheckPush>
            <Row gap={16}>
              <SS.Btn back={"#515151"}>미리보기</SS.Btn>
              <SS.Btn back={"#2563eb"} onClick={() => setAlert(!alert)}>
                등록
              </SS.Btn>
            </Row>
          </Row>
        </SS.NewNotice>
      </SS.Container>
      {alert && (
        <Alert
          setAlert={setAlert}
          text={"공지사항 등록"}
          subtext={"게시물을 등록하시겠습니까?"}
        />
      )}
    </>
  );
};

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};
export default Notices;
