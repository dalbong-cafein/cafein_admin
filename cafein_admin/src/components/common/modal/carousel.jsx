import React, { useEffect } from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Slider from "../../slider";

export default function Sliders({ setModal, imgs }) {
  const closeModal = () => {
    setModal(false);
  };

  let file = [];
  useEffect(() => {
    if (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        console.log(imgs[i].imageUrl);
        file.push({ image: imgs[i].imageUrl, caption: null });
      }
    }
  });

  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>카페 이미지 상세</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <Slider data={imgs} />
      </S.ModalBox>
    </Portal>
  );
}
