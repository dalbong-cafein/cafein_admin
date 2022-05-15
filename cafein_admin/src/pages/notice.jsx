import styled from "styled-components";
import { useState, useRef } from "react";

import * as S from "./style";

import Row from "../components/atoms/row";

import Paging from "../components/common/Pagination";

import { ReactComponent as Search } from "../svg/Search.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Square } from "../svg/square.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";

import PVImg from "../components/common/PVImg";

const Notice = () => {
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

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(1);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(temp.length * 3 - 1);
  const [items, setItems] = useState(10);
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
      <Headers>
        <div>
          <Menu menustate={menu === "Notice"} onClick={() => setMenu("Notice")}>
            공지사항
          </Menu>
          <Menu menustate={menu === "QnA"} onClick={() => setMenu("QnA")}>
            자주 묻는 질문
          </Menu>
        </div>
      </Headers>
      <Container>
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
        <NewNotice>
          <p>새 공지 등록</p>
          <div>
            <Input type="text" placeholder="날짜" />
            <Input type="text" placeholder="제목" />
            <TextBox>
              <textarea type="text" placeholder="내용을 입력하세요" />
              <PhotoBox>
                <FileUpload
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
                </FileUpload>
                {file?.map((a, i) => {
                  return (
                    <ImgBox key={i}>
                      <CloseIcon name={a.name} onClick={() => deleteImg(i)} />
                      <PVImg img={a} />
                    </ImgBox>
                  );
                })}
              </PhotoBox>
            </TextBox>
          </div>
          <Row gap={115} justify={"space-between"} align={"baseline"}>
            <CheckPush>
              <Square />
              <p>App Push</p>
            </CheckPush>
            <Row gap={16}>
              <Btn back={"#515151"}>미리보기</Btn>
              <Btn back={"#2563eb"}>등록</Btn>
            </Row>
          </Row>
        </NewNotice>
      </Container>
    </>
  );
};

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 102px 48px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: baseline;
  }
`;

const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 24px;
  ${(props) =>
    props.menustate && "font-weight:bold; border-bottom:2px solid #fff"};
  padding-bottom: 8px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 56px;
  & > div {
    flex: 1;
  }
`;

const NewNotice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  width: 100%;
  box-sizing: border-box;
  & > p:first-child {
    font-size: 18px;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 48px;
  background-color: #333333;
  color: #8b8b8b;
  border-radius: 6px;
  border: 0;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  padding: 12px;
  &:focus {
    outline: none;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  gap: 12px;
`;

const FileUpload = styled.div`
  width: 80px;
  height: 80px;
  background: #c4c4c4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 9.5px;
  cursor: pointer;
  & > div {
    color: #646464;
    font-size: 13px;
    font-weight: 500;
  }
`;

const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  display: inline-block;
  border-radius: 6px;
  & > svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(50px, 5px);
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #333333;
  color: #8b8b8b;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px;
  & > textarea {
    width: 90%;
    heigth: 80%;
    background-color: #333333;
    border: 0;
  }
`;

const CheckPush = styled.div`
  display: flex;
  gap: 15px;
`;

const Btn = styled.div`
  color: #f6f6f6;
  background-color: ${(props) => props.back && props.back};
  width: 180px;
  height: 40px;
  border-radius: 6px;
  line-height: 40px;
  text-align: center;
`;

export default Notice;
