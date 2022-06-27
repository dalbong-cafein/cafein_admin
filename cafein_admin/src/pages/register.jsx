import * as S from "./regSt";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import { useRecoilState } from "recoil";
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

import { feedCreateApi } from "../util/management";

import Row from "../components/atoms/row";
import Header from "../components/common/header";
import PVImg from "../components/common/PVImg";
import SearchModal from "../components/common/modal/SearchModal";

import { convertTime, updateDay } from "../hooks/registerHook";

const Register = () => {
  const navigate = useNavigate();
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
    "없어요 그냥 없어요",
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

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };

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

  const recommendChange = (e) => {
    const copy = { ...register };
    copy.recommendation = e.currentTarget.id;
    setRegister(copy);
  };

  const starChange = (e) => {
    const star = e.currentTarget.id;
    const name = e.currentTarget.parentNode.id;
    const copy = { ...register };
    copy[name] = Number(star);
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
    const copy2 = { ...register };
    for await (let item of a[2]) {
      updateDay(item, copy2, "", "");
    }
    setRegister(copy2);
    const copy = [...dayarr];
    copy.splice(i, 1);
    setDayarr(copy);
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

  const submit = async (register) => {
    console.log(register);
    if (!register.storeName || !register.siNm) {
      window.alert("카페명, 주소를 확인해주세요!");
    } else if (
      !register.recommendation ||
      !register.wifi ||
      !register.restroom ||
      !register.tableSize ||
      !register.socket
    ) {
      window.alert(
        "카공 카페로 추천하시겠어요? 카페에 대한 만족도를 알려주세요"
      );
    }

    feedCreateApi(register)
      .then((res) => navigate("/management"))
      .catch((err) => console.log(err));
  };
  const input = useRef();

  return (
    <>
      <Header
        align={"center"}
        mcolor={"#8B8B8B"}
        text={"카페 관리"}
        inner={"새 카페 등록"}
      >
        <S.Submit
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
            register.storeName &&
            register.siNm &&
            register.recommendation &&
            register.wifi &&
            register.restroom &&
            register.tableSize &&
            register.socket
          }
          onClick={() => submit(register)}
        >
          등록
        </S.Submit>
      </Header>
      <S.Containaer>
        <Row gap={20}>
          <S.Column>
            <S.InputBox>
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
            </S.InputBox>
            <S.InputBox>
              <span>주소</span>
              <div>{loc.address_name} </div>
            </S.InputBox>

            <S.Box height={176}>
              <p>카공 카페로 추천하시겠어요?</p>
              <S.RowBox>
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
                  id="NORAML"
                  onClick={(e) => {
                    recommendChange(e);
                  }}
                >
                  {register.recommendation === "NORAML" ? (
                    <CCsoso />
                  ) : (
                    <Csoso />
                  )}
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
              </S.RowBox>
            </S.Box>
            <S.Box height={304}>
              <p>카페에 대한 만족도를 알려주세요</p>
              <S.ColumnBox>
                <div>
                  <p>콘센트</p>
                  <S.StarBox id="socket" isFill={register.socket}>
                    <Star id={1} onClick={(e) => starChange(e)} />
                    <Star id={2} onClick={(e) => starChange(e)} />
                    <Star id={3} onClick={(e) => starChange(e)} />
                    <Star id={4} onClick={(e) => starChange(e)} />
                  </S.StarBox>
                  {register.socket && <p>{socketText[register.socket - 1]}</p>}
                </div>
                <div>
                  <p>와이파이</p>
                  <S.StarBox id="wifi" isFill={register.wifi}>
                    <Star id={1} onClick={(e) => starChange(e)} />
                    <Star id={2} onClick={(e) => starChange(e)} />
                    <Star id={3} onClick={(e) => starChange(e)} />
                    <Star id={4} onClick={(e) => starChange(e)} />
                  </S.StarBox>
                  {register.wifi && <p>{wifiText[register.wifi - 1]}</p>}
                </div>
                <div>
                  <p>화장실</p>
                  <S.StarBox id="restroom" isFill={register.restroom}>
                    <Star id={1} onClick={(e) => starChange(e)} />
                    <Star id={2} onClick={(e) => starChange(e)} />
                    <Star id={3} onClick={(e) => starChange(e)} />
                    <Star id={4} onClick={(e) => starChange(e)} />
                  </S.StarBox>
                  {register.restroom && (
                    <p>{restroomText[register.restroom - 1]}</p>
                  )}
                </div>
                <div>
                  <p>테이블</p>
                  <S.StarBox id="tableSize" isFill={register.tableSize}>
                    <Star id={1} onClick={(e) => starChange(e)} />
                    <Star id={2} onClick={(e) => starChange(e)} />
                    <Star id={3} onClick={(e) => starChange(e)} />
                    <Star id={4} onClick={(e) => starChange(e)} />
                  </S.StarBox>
                  {register.tableSize && (
                    <p>{tableSizeText[register.tableSize - 1]}</p>
                  )}
                </div>
              </S.ColumnBox>
            </S.Box>
            <S.TextBox>
              <p>안내사항</p>
              <p>카공인에게 도움이 될 수 있는 정보를 공유해 주세요.</p>
              <p>
                부적절한 정보가 등록될 경우 카페인 운영정책에 따라 삭제될 수
                있어요.
              </p>
            </S.TextBox>
          </S.Column>
          <S.Column>
            <S.Box height={168}>
              <p>장소 사진</p>
              <S.PhotoBox>
                <S.FileUpload
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
                </S.FileUpload>
                {file?.map((a, i) => {
                  return (
                    <S.ImgBox key={i}>
                      <CloseIcon name={a.name} onClick={() => deleteImg(i)} />
                      <PVImg img={a} />
                    </S.ImgBox>
                  );
                })}
              </S.PhotoBox>
            </S.Box>
            <S.Box height={128}>
              <p>운영시간</p>
              <S.TimeBox>
                <S.BtnRow gap={13}>
                  <S.Btn>
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
                  </S.Btn>
                  <S.Btn>
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
                  </S.Btn>
                  <S.Btn2 isT={selectOn} onClick={() => setSelectOn(!selectOn)}>
                    {days.length === 0 ? (
                      <Row gap={13} align={"center"}>
                        <p>반복</p> {selectOn ? <ArrowUp /> : <ArrowDown />}
                      </Row>
                    ) : (
                      <p>{days.join(" ")}</p>
                    )}
                  </S.Btn2>
                  <Plus onClick={addTime} />
                </S.BtnRow>
                {dayarr.map((item, i) => (
                  <S.Day key={i}>
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
                  </S.Day>
                ))}
              </S.TimeBox>
            </S.Box>
            {selectOn && (
              <S.ComboBox>
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
              </S.ComboBox>
            )}
            <S.InputBox>
              <span>기타 운영 시간</span>
              <input
                type="text"
                placeholder="Ex. 매달 첫째주 수요일"
                name="etcTime"
                defaultValue={register.etcTime}
                onChange={(e) => onChange(e)}
              />
            </S.InputBox>
            <S.InputBox>
              <span>전화번호</span>
              <input
                type="text"
                name="phone"
                defaultValue={loc?.phone}
                onChange={(e) => onChange(e)}
                placeholder="카페 전화번호를 입력해주세요"
              />
            </S.InputBox>
            <S.InputBox>
              <span>웹사이트</span>
              <input
                type="text"
                name="website"
                defaultValue={register.website}
                onChange={(e) => onChange(e)}
                placeholder="카페 홈페이지 또는 인스타그램 주소를 입력해주세요"
              />
            </S.InputBox>
            <S.InputBox>
              <span>와이파이 비밀번호</span>
              <input
                type="text"
                placeholder="와이파이 비밀번호를 입력해 주세요"
                name="wifiPassword"
                defaultValue={register.wifiPassword}
                onChange={(e) => onChange(e)}
              />
            </S.InputBox>
          </S.Column>
        </Row>
      </S.Containaer>
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

export default Register;
