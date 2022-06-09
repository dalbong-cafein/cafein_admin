import styled from "styled-components";
import Row from "../components/atoms/row";
import Header from "../components/common/header";
// import { useRecoilState } from "recoil";
// import { registerState } from "../recoil/NcafeRegister";

import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";
import { ReactComponent as Plus } from "../svg/plus.svg";
import { ReactComponent as ArrowDown } from "../svg/ArrowDown.svg";
import { ReactComponent as ArrowUp } from "../svg/ArrowUp.svg";
import { ReactComponent as Search } from "../svg/Search.svg";

import { useState, useRef, useEffect } from "react";
import PVImg from "../components/common/PVImg";
import SearchModal from "../components/common/modal/SearchModal";
import { feedCreateApi } from "../util/management";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [register, setRegister] = useState({});
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectOn, setSelectOn] = useState(false);
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState({ address_name: null });
  const [searchModal, setSearchModal] = useState(false);
  const [days, setDays] = useState([]);
  const [dayarr, setDayarr] = useState([]);

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

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };

  const submit = async (register) => {
    console.log(register);

    // feedCreateApi(register)
    //   .then((res) => navigate("/management"))
    //   .catch((err) => console.log(err));
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
    const copy2 = { ...register };
    for await (let item of a[2]) {
      updateDay(item, copy2, "", "");
    }
    setRegister(copy2);
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
  const convertTime = (time) => {
    time = time.padStart(2, "0");
    if (!time.includes(":")) {
      time += ":00";
    }
    return time;
  };

  const addTime = async () => {
    const copy = [...dayarr];
    const copy2 = { ...register };
    const open = await convertTime(openTime);
    const close = await convertTime(closeTime);
    for await (let item of days) {
      updateDay(item, copy2, open, close);
    }
    setRegister(copy2);
    copy.push([open, close, days]);
    setDayarr(copy);
    setOpenTime("");
    setCloseTime("");
    setDays([]);
    setSelectOn(false);
  };

  const convertDay = (j) => {
    if (j === "onMon") return "월";
    if (j === "onTue") return "화";
    if (j === "onWed") return "수";
    if (j === "onThu") return "목";
    if (j === "onFri") return "금";
    if (j === "onSat") return "토";
    if (j === "onSun") return "일";
  };
  const input = useRef();
  useEffect(() => {
    const fetching = async () => {
      const obj = Object.keys(state.businessHoursResDto);
      const copy = [...dayarr];
      const copy2 = { ...register };
      obj.map((item, i) => {
        if (item !== "etcTime") {
          const day = convertDay(item);
          const open = state?.businessHoursResDto[item]?.open;
          const close = state?.businessHoursResDto[item]?.closed;
          copy.push([open, close, day]);
          updateDay(day, copy2, open, close);
        }
      });

      setDayarr(copy);
      setRegister(copy2);
    };
    const fetchingImg = async () => {
      const copy = [...file];
      const copy2 = { ...register };
      if (state.storeImageDtoList) {
        for (let i = 0; i < state.storeImageDtoList.length; i++) {
          copy.push(state.storeImageDtoList[i].imageUrl);
        }
      }
      setFile(copy);
      copy2.imageFiles = copy;
      setRegister(copy2);
    };
    fetching();
    fetchingImg();
  }, []);

  return (
    <>
      <Header
        align={"center"}
        mcolor={"#8B8B8B"}
        text={"카페 관리"}
        inner={"카페 상세 수정"}
      >
        <div>
          <Submit>취소</Submit>
          <Submit
            disalbed={
              register.storeName == null ||
              register.siNm == null ||
              register.recommendation == null ||
              register.wifi == null ||
              register.restroom == null ||
              register.tableSize == null ||
              register.socket == null
            }
            isFill={
              register.storeName !== null &&
              register.siNm !== null &&
              register.recommendation !== null &&
              register.wifi !== null &&
              register.restroom !== null &&
              register.tableSize !== null &&
              register.socket !== null
            }
            onClick={() => submit(register)}
          >
            등록
          </Submit>
        </div>
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
                defaultValue={state.storeName}
                onChange={(e) => {
                  onChange(e);
                  setSearch(e.target.value);
                }}
              />
            </InputBox>
            <InputBox>
              <span>주소</span>
              <div>{loc.address_name || state.address.fullAddress} </div>
            </InputBox>
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
                    accept="image/*"
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
                    {days.length === 0 ? (
                      <Row gap={13} align={"center"}>
                        <p>반복</p> {selectOn ? <ArrowUp /> : <ArrowDown />}
                      </Row>
                    ) : (
                      <p>{days.join(" ")}</p>
                    )}
                  </Btn2>
                  <Plus onClick={addTime} />
                </BtnRow>
                {dayarr &&
                  dayarr.map((item, i) => (
                    <Day key={i}>
                      <div>
                        {item[0].slice(0, 2) > 12 ? "오후" : "오전"}{" "}
                        {item[0].slice(0, 2) > 12
                          ? `${String(item[0].slice(0, 2) - 12).padStart(
                              2,
                              "0"
                            )}:${item[0].slice(3)}`
                          : item[0]}
                      </div>
                      <div>
                        {item[1].slice(0, 2) > 12 ? "오후" : "오전"}{" "}
                        {item[1].slice(0, 2) > 12
                          ? `${String(item[1].slice(0, 2) - 12).padStart(
                              2,
                              "0"
                            )}:${item[1].slice(3)}`
                          : item[1]}
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
            <InputBox>
              <span>기타 운영 시간</span>
              <input
                type="text"
                placeholder="Ex. 매달 첫째주 수요일"
                name="etcTime"
                defaultValue={state.businessHoursResDto.etcTime}
                onChange={(e) => onChange(e)}
              />
            </InputBox>
            <InputBox>
              <span>전화번호</span>
              <input
                type="text"
                name="phone"
                defaultValue={loc?.phone || state.phone}
                onChange={(e) => onChange(e)}
                placeholder="카페 전화번호를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <span>웹사이트</span>
              <input
                type="text"
                name="website"
                defaultValue={state.website}
                onChange={(e) => onChange(e)}
                placeholder="카페 홈페이지 또는 인스타그램 주소를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <span>와이파이 비밀번호</span>
              <input
                type="text"
                placeholder="와이파이 비밀번호를 입력해 주세요"
                name="wifiPassword"
                defaultValue={state.wifiPassword}
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
const Submit = styled.button`
  width: 88px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  border-radius: 6px;
  background-color: ${(props) => (props.isFill ? "#2563EB" : "#333333")};
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
  & > div {
    color: #e3e3e3;
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
  max-height: 155px;
  overflow-y: scroll;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
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
  transform: translate(-400%, 185%);
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
