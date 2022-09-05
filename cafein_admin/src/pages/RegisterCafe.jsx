import * as S from "./regSt";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useRecoilState } from "recoil";
import { registerState } from "../recoil/NcafeRegister";

import { ReactComponent as Search } from "../svg/Search.svg";

import { feedCreateApi } from "../util/management";

import Row from "../components/atoms/row";
import Header from "../components/common/Header";
import SearchModal from "../components/common/modal/SearchModal";
import RegisterCafeRowStar from "../components/RegisterCafeRowStar";
import CafeTimeBox from "../components/common/CafeTimeBox";
import RegisterCafeRecommendation from "../components/RegisterCafeRecommendation";
import FileUpload from "../components/common/FileUproad";

const RegisterCafe = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useRecoilState(registerState);
  const [search, setSearch] = useState("");
  const [loc, setLoc] = useState({ address_name: "" });
  const [searchModal, setSearchModal] = useState(false);

  //timeBox
  const [dayarr, setDayarr] = useState([]);

  const onChange = (e) => {
    const name = e.target.name;
    const copy = { ...register };
    copy[name] = e.target.value;
    setRegister(copy);
  };

  const submit = async (register) => {
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
      .then((res) => {
        navigate("/management");
        setRegister(registerState);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header
        align={"center"}
        mcolor={"#8B8B8B"}
        text={"카페 관리"}
        inner={"새 카페 등록"}
      >
        <S.Submit
          disabled={
            register.storeName ||
            register.siNm ||
            register.recommendation ||
            register.wifi ||
            register.restroom ||
            register.tableSize ||
            register.socket
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

            <RegisterCafeRecommendation
              register={register}
              setRegister={setRegister}
            />
            <S.Box height={304}>
              <p>카페에 대한 만족도를 알려주세요</p>
              <S.ColumnBox>
                <RegisterCafeRowStar
                  content="socket"
                  register={register}
                  setRegister={setRegister}
                />
                <RegisterCafeRowStar
                  content="wifi"
                  register={register}
                  setRegister={setRegister}
                />
                <RegisterCafeRowStar
                  content="restroom"
                  register={register}
                  setRegister={setRegister}
                />
                <RegisterCafeRowStar
                  content="tableSize"
                  register={register}
                  setRegister={setRegister}
                />
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
              <FileUpload register={register} setRegister={setRegister} />
            </S.Box>
            <CafeTimeBox
              dayarr={dayarr}
              setDayarr={setDayarr}
              register={register}
              setRegister={setRegister}
            />
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

export default RegisterCafe;
