import * as S from "../../pages/regSt";
import PVImg from "./PVImg";
import { ReactComponent as Photo } from "../../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../../svg/close.svg";
import { useState } from "react";
import { useRef } from "react";
import { resizeImg } from "../../constant/resizeImg";

export default function FileUpload({ register, setRegister, num = 5, submitFunc }) {
  const [file, setFile] = useState([]);
  const input = useRef();

  const onLoadFile = async (e) => {
    if (submitFunc) submitFunc();
    else {
      let copy = [...file];
      if (copy.length >= num) {
        window.alert(`이미지는 ${num}개만 추가 가능합니다`);
        return;
      } else {
        if (e.target.files[0]) {
          const file = await resizeImg(e.target.files[0]);
          copy = [...copy, file];
          setFile(copy);
          const copy2 = { ...register };
          copy2.imageFiles = copy;
          setRegister(copy2);
        }
      }
    }
  };

  const deleteImg = (idx) => {
    const copy = [...file];
    const copy2 = { ...register };
    copy.splice(idx, 1);
    copy2.imageFiles = copy;
    setFile(copy);
    setRegister(copy2);
  };
  return (
    <S.PhotoBox>
      <S.FileUpload
        onClick={() => {
          input.current?.click();
        }}
      >
        <Photo />
        <div>
          {file.length}/{num}
        </div>
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
  );
}
