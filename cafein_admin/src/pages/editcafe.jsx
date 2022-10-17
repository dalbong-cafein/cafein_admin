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
  const [updateImg, setUpdata] = useState([]);

  const onLoadFile = (e) => {
    let copy = [...file];
    if (copy.length >= 5) {
      window.alert("이미지는 5개만 추가 가능합니다");
      return;
    } else {
      if (e.target.files[0]) {
        copy = [...copy, e.target.files[0]];
        setFile(copy);
        let coppy = [...updateImg, e.target.files[0]];

        const copy2 = { ...register };
        copy2.updateImageFiles = coppy;
        setRegister(copy2);
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

  const submit = async (register) => {
    console.log(register);
    feedEditApi(register)
      .then((res) => {
        console.log(res);
        navigate("/management");
      })
      .catch((err) => {
        window.alert("조금 이따가 다시 시도해주세요");
        navigate("/management");
      });
  };

  useEffect(() => {
    const fetchingData = async () => {
      const copy = { ...register };
      copy.storeId = state.storeId;
      const obj = Object.keys(copy);
      obj.map((item) => {
        if (state[item]) {
          copy.item = state[item];
        }
      });

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
            const open = state?.businessHoursResDto[item]?.open;
            const close = state?.businessHoursResDto[item]?.closed;
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
  }, []);

  return (
    <>
      <Header align="center" mcolor="#8B8B8B" text="카페 관리" inner="카페 상세 수정" btn={false}>
        <div>
          <S.Submit style={{ marginRight: "15px" }} onClick={() => window.history.back()}>
            취소
          </S.Submit>
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
            onClick={() => submit(register)}
          >
            등록
          </S.Submit>
        </div>
      </Header>
      <S.Containaer>
        <Row gap={20}>
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
            <CafeTimeBox dayarr={dayarr} setDayarr={setDayarr} register={register} setRegister={setRegister} isEdit />
            <S.TextBox>
              <p>안내사항</p>
              <p>카공인에게 도움이 될 수 있는 정보를 공유해 주세요.</p>
              <p>부적절한 정보가 등록될 경우 카페인 운영정책에 따라 삭제될 수 있어요.</p>
            </S.TextBox>
          </S.Column>
          <S.Column>
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

export default Editcafe;
