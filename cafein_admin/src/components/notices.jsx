import { useState, useRef, useEffect } from "react";

import * as S from "../pages/style";
import * as SS from "./noticesStyle";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as Check } from "../svg/check.svg";

import { useNavigate } from "react-router-dom";
import { ReactComponent as Square } from "../svg/square.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";

import PVImg from "../components/common/PVImg";
import Alert from "./common/modal/alert";
import { adminFeedListApi } from "../util/admin";
import None from "./None";

import { useRecoilState } from "recoil";
import { registerNotice } from "../recoil/NNotice";
import { registerNoticeApi } from "../util/events";

const Notices = () => {
  const [temp, setTemp] = useState([]);
  const [sort, setSort] = useState("DESC");

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();
  const [register, setRegister] = useRecoilState(registerNotice);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(10);
  const [alert, setAlert] = useState(false);
  const handlePageChange = (page) => {
    setPage(page);
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
        const copy2 = { ...register };
        copy2.imageFiles = copy;
        setRegister(copy2);
      }
    }
  };

  const deleteImg = (idx) => {
    let copy = [...file];
    copy.splice(idx, 1);
    setFile(copy);
  };

  const onSubmit = (register) => {
    const copy = { ...register };
    copy.boardCategoryId = 1;
    setRegister(copy);
    registerNoticeApi(register)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };

  const sortData = (id) => {
    setSort(id);
  };

  useEffect(() => {
    adminFeedListApi(page, sort).then((res) => {
      setCount(res.data.data.boardCnt);
      setTemp(res.data.data.boardResDtoList.dtoList);
    });
  }, [sort, page]);
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
              <S.Sbtn id="DESC" onClick={(e) => sortData(e.target.id)}>
                최신순
                {sort === "DESC" && <Check />}
              </S.Sbtn>
              <S.Sbtn id="ASC" onClick={(e) => sortData(e.target.id)}>
                오래된 순{sort === "ASC" && <Check />}
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
          <S.Wrapper isNull={temp.length === 0}>
            <S.TableHeader>
              <tr>
                <td>분류</td>
                <td>제목</td>
                <td>PUSH</td>
                <td>등록일</td>
              </tr>
              <>
                {temp &&
                  temp.map((item) => (
                    <tr>
                      <td>{item.code}</td>
                      <td>
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
          {temp.length == 0 && <None text={"공지"} />}
        </div>
        <SS.NewNotice>
          <p>새 공지 등록</p>

          <div>
            <SS.Input>
              <p>날짜</p>
              <div>{new Date().toLocaleDateString()}</div>
            </SS.Input>

            <SS.Input>
              <p>제목</p>
              <input type="text" name="title" onChange={(e) => onChange(e)} />
            </SS.Input>
            <SS.TextBox>
              <textarea
                cols="50"
                rows="20"
                placeholder="내용을 입력하세요"
                name="content"
                onChange={(e) => onChange(e)}
              />

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
          func={onSubmit}
          forFunc={register}
        />
      )}
    </>
  );
};

export default Notices;
