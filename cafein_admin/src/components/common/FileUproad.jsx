import * as S from "../../pages/regSt";
import PVImg from "./PVImg";
import { ReactComponent as Photo } from "../../svg/photo.svg";
import { ReactComponent as CloseIcon } from "../../svg/close.svg";
import { useState } from "react";
import { useRef } from "react";

export default function FileUpload({ register, setRegister }) {
  const [file, setFile] = useState([]);
  const input = useRef();

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
  );
}
