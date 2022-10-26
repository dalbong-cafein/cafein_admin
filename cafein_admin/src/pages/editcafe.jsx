import * as S from "./regSt";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRecoilState } from "recoil";
import { editcafe } from "../recoil/editcafe";

import { ReactComponent as Photo } from "../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../svg/close.svg";

import PVImg from "../components/common/PVImg";
import SearchModal from "../components/modal/SearchModal";
import Row from "../components/atoms/row";
import Header from "../components/common/Header";

import { updateDay } from "../hooks/registerHook";
import { feedEditApi } from "../util/management";
import CafeTimeBox from "../components/common/CafeTimeBox";
import { resizeImg } from "../constant/resizeImg";

const Editcafe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [register, setRegister] = useRecoilState(editcafe);
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState({ address_name: null });
  const [searchModal, setSearchModal] = useState(false);
  const [dayarr, setDayarr] = useState([]);
  const [delImg, setDelImg] = useState([]);
  const [updateImg, setUpdateImg] = useState([]);

  const onLoadFile = async (e) => {
    let copy = [...file];
    if (copy.length >= 5) {
      window.alert("이미지는 5개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        const file = await resizeImg(e.target.files[0]);
        copy.push(file);
        setFile(copy);
        let copy3 = [...updateImg];
        copy3.push(file);
        setUpdateImg(() => copy3);

        const copy2 = { ...register };
        copy2.updateImageFiles = copy3;
        setRegister(() => copy2);
      }
    }
  };

  const deleteImg = async (a, idx) => {
    const copy = [...file];
    const copy2 = { ...register };
    let coppy = [...delImg];
    const hasfile = await state.storeImageDtoList.filter((item) => item.imageUrl === a);
    if (hasfile[0]) {
      coppy.push(hasfile[0].imageId);
    }
    copy.splice(idx, 1);
    copy2.deleteImageIdList = coppy;
    setFile(copy);
    setRegister(copy2);
    setDelImg(coppy);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
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

  const submit = async () => {
    feedEditApi(register)
      .then((res) => {
        console.log(res);
        navigate("/management");
      })
      .catch((err) => {
        console.log(err);
        // window.alert("조금 이따가 다시 시도해주세요");
        // navigate("/management");
      });
  };

  useEffect(() => {
    const fetchingData = async () => {
      const copy = { ...register };
      copy.storeId = state.storeId;
      const obj = Object.keys(register);
      for (let key of obj) {
        copy[key] = state[key];
      }
      setRegister(copy);
    };

    const fetching = async () => {
      const obj = Object.keys(state.businessHoursResDto);
      const copy = [...dayarr];
      const copy2 = { ...register };
      obj?.map((item, i) => {
        if (state?.businessHoursResDto) {
          if (item !== "etcTime") {
            const day = convertDay(item);
            const open = state.businessHoursResDto[item].open || null;
            const close = state.businessHoursResDto[item].closed || null;
            copy.push([open, close, day]);
            updateDay(day, copy2, open, close);
          }
        }
      });

      setDayarr(copy);
      setRegister(copy2);
    };
    const fetchingImg = async () => {
      const copy = [...file];
      if (state.storeImageDtoList) {
        for (let i = 0; i < state.storeImageDtoList.length; i++) {
          copy.push(state.storeImageDtoList[i].imageUrl);
        }
      }
      setFile(copy);
    };
    if (state) {
      fetching();
      fetchingImg();
      fetchingData();
    }
  }, [state]);

  return (
    <>
      <Header
        halfWidth
        align="center"
        mcolor="#8B8B8B"
        text="카페 관리"
        inner="카페 상세 수정"
        btn={false}
      >
        <S.Submit onClick={() => window.history.back()}>취소</S.Submit>
        <S.Submit
          isFill={
            !register.storeName &&
            !register.siNm &&
            !register.recommendation &&
            !register.wifi &&
            !register.restroom &&
            !register.tableSize &&
            !register.socket
          }
          onClick={submit}
        >
          등록
        </S.Submit>
      </Header>
      <S.Containaer>
        <S.Column>
          <S.InputBox>
            <span>카페명</span>
            <div>{state.storeName}</div>
          </S.InputBox>
          <S.InputBox>
            <span>주소</span>
            <div>{loc.address_name || state.address.fullAddress} </div>
          </S.InputBox>
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
              {file?.map((a, idx) => {
                return (
                  <S.ImgBox key={idx}>
                    <CloseIcon name={a.name} onClick={() => deleteImg(a, idx)} />
                    <PVImg img={a} />
                  </S.ImgBox>
                );
              })}
            </S.PhotoBox>
          </S.Box>
          <CafeTimeBox
            dayarr={dayarr}
            setDayarr={setDayarr}
            register={register}
            setRegister={setRegister}
            isEdit
          />
          <S.InputBox>
            <span>기타 운영 시간</span>
            <input
              type="text"
              placeholder="Ex. 매달 첫째주 수요일"
              name="etcTime"
              defaultValue={state?.businessHoursResDto?.etcTime}
              onChange={(e) => onChange(e)}
            />
          </S.InputBox>
          <S.InputBox>
            <span>전화번호</span>
            <input
              type="text"
              name="phone"
              defaultValue={loc?.phone || state.phone}
              onChange={(e) => onChange(e)}
              placeholder="카페 전화번호를 입력해주세요"
            />
          </S.InputBox>
          <S.InputBox>
            <span>웹사이트</span>
            <input
              type="text"
              name="website"
              defaultValue={state.website}
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
              defaultValue={state.wifiPassword}
              onChange={(e) => onChange(e)}
            />
          </S.InputBox>
        </S.Column>
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

export default Editcafe;
