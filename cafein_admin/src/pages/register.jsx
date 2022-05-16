import styled from "styled-components";
import Row from "../components/atoms/row";
import Header from "../components/common/header";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { registerState } from "../recoil/NcafeRegister";

import { ReactComponent as Cgood } from "../svg/Cgood.svg";
import { ReactComponent as Cbad } from "../svg/Cbad.svg";
import { ReactComponent as Csoso } from "../svg/Csoso.svg";
import { ReactComponent as Star } from "../svg/Star.svg";
import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";
import { ReactComponent as CCbad } from "../svg/CCbad.svg";
import { ReactComponent as CCgood } from "../svg/CCgood.svg";
import { ReactComponent as CCsoso } from "../svg/CCsoso.svg";
import { ReactComponent as Plus } from "../svg/plus.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";
import { ReactComponent as ArrowUp } from "../svg/ArrowUp.svg";
import { ReactComponent as Search } from "../svg/Search.svg";

import { useState, useRef } from "react";
import PVImg from "../components/common/PVImg";
import SearchModal from "../components/common/modal/SearchModal";

const Register = () => {
  const [file, setFile] = useState([]);
  const [register, setRegister] = useRecoilState(registerState);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectOn, setSelectOn] = useState(false);
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState({ address_name: "" });
  const [searchModal, setSearchModal] = useState(false);
  const [days, setDays] = useState([]);
  const [dayarr, setDayarr] = useState([]);
  const socketText = [
    "바닥을 기어봐도 없어요",
    "찾기 힘들어요",
    "여유 있어요",
    "모든 자리에 있어요",
  ];
  const wifiText = [
    "없어요 그냥 없어요",
    "자주 끊겨서 화나요",
    "그냥 저냥 쓸 만해요",
    "빵빵 잘 터져요",
  ];
  const restroomText = [
    "바닥을 기어봐도 없어요",
    "이용하기가 꺼려져요",
    "그냥 저냥 쓸 만해요",
    "화장실 맛집이에요",
  ];
  const tableSizeText = [
    "테이블이 카공을 허락하지 않아요",
    "오래 이용하면 몸이 아파요",
    "그냥 저냥 쓸 만해요",
    "매우 편하게 사용 가능해요",
  ];

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

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };

  const recommendChange = (e) => {
    const copy = { ...register };
    copy.recommendation = e.currentTarget.id;
    setRegister(copy);
  };

  const submit = async (register) => {
    const copy = { ...register };
    copy.imageFiles = file;
    for await (let i of dayarr) {
      for await (let j of i[2]) {
        updateDay(j, copy, i[0], i[1]);
      }
    }
    setRegister(copy);
    if (register.storeName === "") {
      window.alert("카페명을 입력해주세요");
    } else {
      console.log(register);

      if (register) {
        //api 불러오삼
      }
    }
  };

  const starChange = (e) => {
    const star = e.currentTarget.id;
    const name = e.currentTarget.parentNode.id;
    const copy = { ...register };
    copy[name] = star;
    setRegister(copy);
  };

  const dayPush = async (e) => {
    e.stopPropagation();
    const copy = [...days];
    if (!days.includes(e.currentTarget.id)) {
      copy.push(e.currentTarget.id);
      setDays(copy);
    } else {
      copy.splice(days.indexOf(e.currentTarget.id), 1);
      setDays(copy);
    }
  };

  const deleteDay = async (a, i) => {
    const copy = [...dayarr];
    copy.splice(i, 1);
    setDayarr(copy);
  };
  const updateDay = (j, copy, open, close) => {
    if (j === "월") {
      copy.monOpen = open;
      copy.monClose = close;
    }
    if (j === "화") {
      copy.tueOpen = open;
      copy.tueClose = close;
    }
    if (j === "수") {
      copy.wedOpen = open;
      copy.wedClose = close;
    }
    if (j === "목") {
      copy.thuOpen = open;
      copy.thuClose = close;
    }
    if (j === "금") {
      copy.friOpen = open;
      copy.friClose = close;
    }
    if (j === "토") {
      copy.satOpen = open;
      copy.satClose = close;
    }
    if (j === "일") {
      copy.sunOpen = open;
      copy.sunClose = close;
    }
  };

  const addTime = async () => {
    const copy = [...dayarr];
    copy.push([openTime, closeTime, days]);
    setDayarr(copy);
    setOpenTime("");
    setCloseTime("");
    setDays([]);
    setSelectOn(false);
  };
  const input = useRef();
  console.log(loc);

  return (
    <>
      <Header
        align={"center"}
        mcolor={"#8B8B8B"}
        text={"카페 관리"}
        inner={"새 카페 등록"}
      >
        <Submit onClick={() => submit(register)}>등록</Submit>
      </Header>
      <Containaer>
        <Row gap={20}>
          <Column>
            <InputBox>
              <span>카페명</span>
              <Search onClick={() => setSearchModal(!searchModal)} />
              <input
                name="storeName"
                type="text"
                value={search}
                onChange={(e) => {
                  onChange(e);
                  setSearch(e.target.value);
                }}
              />
            </InputBox>
            <InputBox>
              <span>주소</span>
              <div>{loc.address_name} </div>
            </InputBox>

            <Box height={176}>
              <p>카공 카페로 추천하시겠어요?</p>
              <RowBox>
                <div
                  id="BAD"
                  onClick={(e) => {
                    recommendChange(e);
                  }}
                >
                  {register.recommendation === "BAD" ? <CCbad /> : <Cbad />}
                  <p>별로예요</p>
                </div>
                <div
                  id="SOSO"
                  onClick={(e) => {
                    recommendChange(e);
                  }}
                >
                  {register.recommendation === "SOSO" ? <CCsoso /> : <Csoso />}
                  <p>그저 그래요</p>
                </div>
                <div
                  id="GOOD"
                  onClick={(e) => {
                    recommendChange(e);
                  }}
                >
                  {register.recommendation === "GOOD" ? <CCgood /> : <Cgood />}
                  <p>추천해요</p>
                </div>
              </RowBox>
            </Box>
            <Box height={304}>
              <p>카페에 대한 만족도를 알려주세요</p>
              <ColumnBox>
                <div>
                  <p>콘센트</p>
                  <StarBox id="socket" isFill={register.socket}>
                    <Star id="1" onClick={(e) => starChange(e)} />
                    <Star id="2" onClick={(e) => starChange(e)} />
                    <Star id="3" onClick={(e) => starChange(e)} />
                    <Star id="4" onClick={(e) => starChange(e)} />
                  </StarBox>
                  {register.socket && <p>{socketText[register.socket - 1]}</p>}
                </div>
                <div>
                  <p>와이파이</p>
                  <StarBox id="wifi" isFill={register.wifi}>
                    <Star id="1" onClick={(e) => starChange(e)} />
                    <Star id="2" onClick={(e) => starChange(e)} />
                    <Star id="3" onClick={(e) => starChange(e)} />
                    <Star id="4" onClick={(e) => starChange(e)} />
                  </StarBox>
                  {register.wifi && <p>{wifiText[register.wifi - 1]}</p>}
                </div>
                <div>
                  <p>화장실</p>
                  <StarBox id="restroom" isFill={register.restroom}>
                    <Star id="1" onClick={(e) => starChange(e)} />
                    <Star id="2" onClick={(e) => starChange(e)} />
                    <Star id="3" onClick={(e) => starChange(e)} />
                    <Star id="4" onClick={(e) => starChange(e)} />
                  </StarBox>
                  {register.restroom && (
                    <p>{restroomText[register.restroom - 1]}</p>
                  )}
                </div>
                <div>
                  <p>테이블</p>
                  <StarBox id="tableSize" isFill={register.tableSize}>
                    <Star id="1" onClick={(e) => starChange(e)} />
                    <Star id="2" onClick={(e) => starChange(e)} />
                    <Star id="3" onClick={(e) => starChange(e)} />
                    <Star id="4" onClick={(e) => starChange(e)} />
                  </StarBox>
                  {register.tableSize && (
                    <p>{tableSizeText[register.tableSize - 1]}</p>
                  )}
                </div>
              </ColumnBox>
            </Box>
            <TextBox>
              <p>안내사항</p>
              <p>카공인에게 도움이 될 수 있는 정보를 공유해 주세요.</p>
              <p>
                부적절한 정보가 등록될 경우 카페인 운영정책에 따라 삭제될 수
                있어요.
              </p>
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
              <TimeBox>
                <BtnRow gap={13}>
                  <Btn>
                    {openTime && (
                      <p>{openTime.slice(0, 2) > 12 ? "오후" : "오전"}</p>
                    )}
                    <input
                      placeholder="시작 시간"
                      value={openTime}
                      onChange={(e) => {
                        // let temp = e.target.value.padStart(2, "0");
                        // if (temp.length < 3) temp += ":00";
                        setOpenTime(e.target.value);
                      }}
                    />
                  </Btn>
                  <Btn>
                    {closeTime && (
                      <p>{closeTime.slice(0, 2) > 12 ? "오후" : "오전"}</p>
                    )}
                    <input
                      placeholder="종료 시간"
                      value={closeTime}
                      onChange={(e) => {
                        setCloseTime(e.target.value);
                      }}
                    />
                  </Btn>
                  <Btn2 isT={selectOn} onClick={() => setSelectOn(!selectOn)}>
                    <Row gap={13} align={"center"}>
                      {days.length === 0 ? (
                        <>
                          <p>반복</p> {selectOn ? <ArrowUp /> : <ArrowDown />}
                        </>
                      ) : (
                        <p>{days.join(" ")}</p>
                      )}
                    </Row>

                    {selectOn && (
                      <ComboBox>
                        <div id="월" onClick={(e) => dayPush(e)}>
                          월요일
                        </div>
                        <div id="화" onClick={(e) => dayPush(e)}>
                          화요일
                        </div>
                        <div id="수" onClick={(e) => dayPush(e)}>
                          수요일
                        </div>
                        <div id="목" onClick={(e) => dayPush(e)}>
                          목요일
                        </div>
                        <div id="금" onClick={(e) => dayPush(e)}>
                          금요일
                        </div>
                        <div id="토" onClick={(e) => dayPush(e)}>
                          토요일
                        </div>
                        <div id="일" onClick={(e) => dayPush(e)}>
                          일요일
                        </div>
                      </ComboBox>
                    )}
                  </Btn2>
                  <Plus onClick={addTime} />
                </BtnRow>
                {dayarr.map((item, i) => (
                  <Day key={i}>
                    <div>
                      {item[0] > 12 ? "오후" : "오전"} {item[0]}
                    </div>
                    <div>
                      {item[0] > 12 ? "오후" : "오전"} {item[1]}
                    </div>
                    <div>
                      {item[2].length == 1 ? item[2] : item[2].join(",")}
                    </div>
                    <p
                      onClick={() => {
                        deleteDay(item, i);
                      }}
                    >
                      삭제
                    </p>
                  </Day>
                ))}
              </TimeBox>
            </Box>
            <InputBox>
              <span>기타 운영 시간</span>
              <input
                type="text"
                placeholder="Ex. 매달 첫째주 수요일"
                name="etcTime"
                defaultValue={register.etcTime}
                onChange={(e) => onChange(e)}
              />
            </InputBox>
            <InputBox>
              <span>전화번호</span>
              <input
                type="text"
                name="phone"
                defaultValue={loc?.phone}
                onChange={(e) => onchange(e)}
                placeholder="카페 전화번호를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <span>웹사이트</span>
              <input
                type="text"
                name="website"
                defaultValue={register.website}
                onChange={(e) => onchange(e)}
                placeholder="카페 홈페이지 또는 인스타그램 주소를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <span>와이파이 비밀번호</span>
              <input
                type="text"
                placeholder="와이파이 비밀번호를 입력해 주세요"
                name="wifiPassword"
                defaultValue={register.wifiPassword}
                onChange={(e) => onChange(e)}
              />
            </InputBox>
          </Column>
        </Row>
      </Containaer>
      {searchModal && (
        <SearchModal
          setModal={setSearchModal}
          search={search}
          setSearch={setSearch}
          setLoc={setLoc}
          setRegister={setRegister}
          register={register}
        />
      )}
    </>
  );
};

const Containaer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const Submit = styled.div`
  width: 88px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 6px;
  background-color: #333333;
  color: #fff;
  transform: translate(20px, 0);
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
  & > svg {
  }
  & > input {
    width: 70%;
    border: 0;
    color: #e3e3e3;
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

  min-height: ${(props) => props.height}px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > p {
    padding: 16px 0 16px 16px;
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

const TimeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const Day = styled.div`
  display: flex;
  padding-left: 16px;
  align-items: center;
  gap: 12px;
  & > p {
    cursor: pointer;
    font-size: 14px;
    color: #ff5c50;
  }
  & > div {
    padding: 13px 16px 13px 16px;
    border: 1px solid #acacac;
    border-radius: 6px;
    font-size: 14px;
    color: #e3e3e3;
    box-sizing: border-box;
  }
  & > div:first-child,
  div:nth-child(2) {
    min-width: 135px;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 13px;
  padding-left: 16px;
  & > svg {
    padding: 15px;
    border-radius: 6px;
    background-color: #fc7521;
  }
`;

const Btn = styled.div`
  padding: 13px 0 13px 16px;
  border: 1px solid #acacac;
  border-radius: 6px;
  font-size: 14px;
  width: 135px;
  box-sizing: border-box;
  background-color: #333333;
  display: flex;
  align-items: baseline;
  color: #fff;
  gap: 24px;
  & > p {
  }
  & > input {
    max-width: 60px;
    border: 0;
    background-color: #333333;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
`;

const Btn2 = styled.div`
  padding: 13px 21px 13px 16px;
  border: 1px solid #acacac;
  color: ${(props) => (props.isT ? "#E3E3E3" : "#8b8b8b")};
  font-size: 14px;
  min-width: 86px;
  box-sizing: border-box;
  position: relative;
  border-radius: 6px;
`;

const ComboBox = styled.div`
  width: 94px;
  height: 230px;
  margin: 0 10px;
  background-color: #646464;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  position: absolute;
  transform: translate(-30%, 10%);
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    text-align: center;
    padding: 3px;
    cursor: pointer;
  }
`;
const RowBox = styled.div`
  display: flex;
  padding: 0 125px;
  justify-content: center;
  gap: 100px;
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
    align-items: center;
    padding-left: 24px;

    & > p:first-child {
      font-size: 15px;
      font-weight: 700;
      line-height: 33px;
      min-width: 100px;
      color: #d1d1d1;
    }
    & > div {
      display: flex;
      gap: 16px;
      margin-right: 18px;
    }
    & > p:nth-child(3) {
      font-size: 14px;
      color: #fff;
    }
  }
`;

const StarBox = styled.div`
  & > svg:first-child {
    path {
      fill: ${(props) => props.isFill >= 1 && "#ffce4a"};
    }
  }
  & > svg:nth-child(2) {
    path {
      fill: ${(props) => props.isFill >= 2 && "#ffce4a"};
    }
  }
  & > svg:nth-child(3) {
    path {
      fill: ${(props) => props.isFill >= 3 && "#ffce4a"};
    }
  }
  & > svg:nth-child(4) {
    path {
      fill: ${(props) => props.isFill >= 4 && "#ffce4a"};
    }
  }
`;
const TextBox = styled.div`
  color: #646464;
  font-size: 14px;
  line-height: 18px;
  & > p:first-child {
    font-weight: bold;
  }
`;

export default Register;
