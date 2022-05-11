import React from "react";
import Portal from "./Portal";
import * as S from "./style";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import Row from "../../atoms/row";

export default function MemoModal({ setModal }) {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Portal>
      <S.ModalBox>
        <S.ModalHeader>
          <p>카페관리 000001</p>
          <Close onClick={closeModal} />
        </S.ModalHeader>
        <S.ModalContent>
          <div>hi</div>
        </S.ModalContent>
        <S.ModalFooter>
          <p>2시간전</p>
          <Row gap={24}>
            <S.Btn color={"#515151"}>삭제</S.Btn>
            <S.Btn color={"#2563eb"}>수정</S.Btn>
          </Row>
        </S.ModalFooter>
      </S.ModalBox>
    </Portal>
  );
}
