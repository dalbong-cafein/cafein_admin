import { useState, useRef, useEffect } from "react";

import * as S from "../pages/style";
import * as SS from "./noticesStyle";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as Check } from "../svg/check.svg";

import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../svg/close.svg";

import PVImg from "../components/common/PVImg";
import Alert from "./common/modal/alert";
import { adminFeedListApi } from "../util/admin";
import None from "./None";

import { useRecoilState } from "recoil";
import { registerNotice } from "../recoil/NNotice";
import { postDelApi, registerNoticeApi } from "../util/events";
import Preview from "./common/modal/preview";
import NoticeModal from "./common/modal/noticeModal";
import RedAlert from "./common/modal/redAlert";

const Notices = ({ menu }) => {
  const [temp, setTemp] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const [sort, setSort] = useState("DESC");

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [register, setRegister] = useRecoilState(registerNotice);
  const [preview, setPreview] = useState(false);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(10);
  const [alert, setAlert] = useState(false);
  const [Dalert, setDAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [file, setFile] = useState([]);
  const onLoadFile = (e) => {
    let copy = [...file];
    if (copy.length >= 1) {
      window.alert("이미지는 1개만 추가 가능합니다");
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
      .then((res) => {
        setAlert(false);
        window.location.reload();
      })
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

  const onDel = () => {
    postDelApi(selectItem.boardId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
                <td>등록일</td>
              </tr>
              <tbody>
                {temp &&
                  temp.map((item) => (
                    <tr
                      onClick={() => {
                        setModal(true);
                        setSelectItem(item);
                      }}
                    >
                      <td>{String(item.boardId).padStart(6, "0")}</td>
                      <td>
                        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                          {item.title}
                        </p>
                        <p>
                          {item.content.length > 30
                            ? item.content.slice(0, 30)
                            : item.content}
                        </p>
                      </td>

                      <td>{String(item.regDateTime).split("T")[0]}</td>
                    </tr>
                  ))}
              </tbody>
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
                  <div>{file.length}/1</div>
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
          <Row gap={16} justify={"end"} align={"baseline"}>
            <SS.Btn back={"#515151"} onClick={() => setPreview(!preview)}>
              미리보기
            </SS.Btn>
            <SS.Btn back={"#2563eb"} onClick={() => setAlert(!alert)}>
              등록
            </SS.Btn>
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

      {preview && (
        <Preview
          item={register}
          setModal={setPreview}
          file={file}
          menu={menu}
        />
      )}
      {modal && (
        <NoticeModal
          setModal={setModal}
          item={selectItem}
          setAlert={setDAlert}
          menu={menu}
        />
      )}
      {Dalert && (
        <RedAlert
          text={"공지사항 삭제"}
          text1={"공지사항을 "}
          text2={"삭제"}
          text3={"하시겠습니까?"}
          setAlert={setDAlert}
          func={onDel}
          forFunc={null}
        />
      )}
    </>
  );
};

export default Notices;
