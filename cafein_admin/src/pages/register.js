import styled from "styled-components";
import Row from "../components/atoms/row";
import Header from "../components/common/header";

import { ReactComponent as Cgood } from "../svg/Cgood.svg";
import { ReactComponent as Cbad } from "../svg/Cbad.svg";
import { ReactComponent as Csoso } from "../svg/Csoso.svg";
import { ReactComponent as Star } from "../svg/Star.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";

import { useState, useRef } from "react";
import PVImg from "../components/common/PVImg";

const Register = () => {
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
      <Header text={"카페 관리"} inner={"새 카페 등록"} />
      <Containaer>
        <Row gap={20}>
          <Column>
            <Input1 type="text" placeholder="카페명" />
            <Input1 type="text" placeholder="주소" />
            <Box height={176}>
              <p>카공 카페로 추천하시겠어요?</p>
              <RowBox>
                <div>
                  <Cbad />
                  <p>별로예요</p>
                </div>
                <div>
                  <Csoso />
                  <p>그저 그래요</p>
                </div>
                <div>
                  <Cgood />
                  <p>추천해요</p>
                </div>
              </RowBox>
            </Box>
            <Box height={304}>
              <p>카페에 대한 만족도를 알려주세요</p>
              <ColumnBox>
                <div>
                  <p>콘센트</p>
                  {/* 나중에 스테이트 만들면 컴포넌트로 따로 빼삼 */}
                  <div>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
                <div>
                  <p>와이파이</p>
                  <div>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
                <div>
                  <p>화장실</p>
                  <div>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
                <div>
                  <p>테이블</p>
                  <div>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                </div>
              </ColumnBox>
            </Box>
            <TextBox>
              <p>안내사항</p>
              <span>카공인에게 도움이 될 수 있는 정보를 공유해 주세요.</span>
              <span>
                부적절한 정보가 등록될 경우 카페인 운영정책에 따라 삭제될 수
                있어요.
              </span>
            </TextBox>
          </Column>
          <Column>
            <Box height={168}>
              <p>장소 사진</p>
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
            </Box>
            <Box height={128}>
              <p>운영시간</p>

              <BtnRow gap={13}>
                <Btn>시작 시간</Btn>
                <Btn>종료 시간</Btn>
                <Btn>반복</Btn>
              </BtnRow>
            </Box>
            <InputBox>
              <span>기타 운영 시간</span>
              <input type="text" placeholder="Ex. 매달 첫째주 수요일" />
            </InputBox>
            <InputBox>
              <span>전화번호</span>
              <input type="text" placeholder="카페 전화번호를 입력해주세요" />
            </InputBox>
            <InputBox>
              <span>웹사이트</span>
              <input
                type="text"
                placeholder=" 카페 홈페이지 또는 인스타그램 주소를 입력해주세요"
              />
            </InputBox>
          </Column>
        </Row>
      </Containaer>
    </>
  );
};

const Containaer = styled.div`
  width: 100%;
`;
const Input1 = styled.input`
  width: 100%;
  height: 48px;
  background-color: #333333;
  color: #8b8b8b;
  border-radius: 6px;
  border: 0;
  font-weight: 500;
  font-size: 16px;
  box-sizing: border-box;
  padding: 16px;
  &:focus {
    outline: none;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 6px;
  color: #8b8b8b;
  font-weight: 500;
  background-color: #333333;
  & > input {
    width: 60%;
    border: 0;
    color: #8b8b8b;
    background-color: inherit;
    font-size: 16px;
    font-weight: 400;
    &:focus {
      outline: none;
    }
  }
`;
const Column = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 16px;
`;

const Box = styled.div`
  background-color: #333333;
  color: #8b8b8b;
  width: 100%;
  box-sizing: border-box;

  height: ${(props) => props.height}px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > p {
    padding: 16px;
    font-weight: 500;
  }
`;

const PhotoBox = styled.div`
  padding: 0 24px;
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
// const DeleteImg = styled.div`
//   width: 25px;
//   height: 25px;
//   cursor: pointer;
//   border-radius: 50%;
//   background: #333333;
//   position: absolute;
// `;

const BtnRow = styled.div`
  display: flex;
  gap: 13px;
  padding-left: 16px;
`;

const Btn = styled.div`
  padding: 13px 48px 13px 16px;
  border: 1px solid #acacac;
  border-radius: 6px;
`;

// const Btn2 = styled.
const RowBox = styled.div`
  display: flex;
  padding: 0 125px;
  justify-content: space-between;
  & > div {
    & > p {
      padding-top: 12px;
      color: #acacac;
      font-size: 14px;
      text-align: center;
      font-weight: 500;
    }
    & > svg {
      cursor: pointer;
    }
  }
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  justify-content: baseline;
  & > div {
    display: flex;
    & > p {
      font-size: 15px;
      font-weight: 700;
      line-height: 33px;
      flex: 1;
      padding-left: 24px;
      color: #d1d1d1;
    }
    & > div {
      flex: 4.5;
      display: flex;
      gap: 16px;
    }
  }
`;
const TextBox = styled.div`
  color: #646464;
  font-size: 14px;
  line-height: 18px;
  & > p {
    font-weight: bold;
  }
`;

export default Register;
