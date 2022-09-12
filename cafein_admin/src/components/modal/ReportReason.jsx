import React, { useState } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import * as S from "./style";
import { ReactComponent as Close } from "../../svg/close2.svg";
import { ReactComponent as Check } from "../../svg/check.svg";
import RedAlert from "./RedAlert";
import { reviewReportApi } from "../../util/review";

export default function ReportReason({ setModal, id }) {
  const closeModal = () => {
    setModal(false);
  };
  const [selected, setSelected] = useState({});
  const [report, setReport] = useState(false);

  const list = [
    "카페와 관련 없는 내용",
    "음란성, 욕설 등 부적절한 내용",
    "부적절한 홍보 또는 광고",
    "개인정보 유출 위험",
    "리뷰 작성, 취지에 맞지 않는 내용(복사글 등)",
    "저작권 도용 의심",
    "기타",
  ];

  const onSelect = (item, i) => {
    setSelected({ content: item, id: i + 1 });
  };

  const onReport = () => {
    reviewReportApi(id, selected.id)
      .then((res) => {
        window.alert("신고되었습니다");
        setModal(false);
      })
      .catch((err) => {
        window.alert("나중에 다시 시도해주세요");
        window.location.reload();
      });
  };

  return (
    <>
      <Portal>
        <S.ModalBox>
          <S.ModalHeader>
            <p>리뷰 신고</p>
            <Close onClick={closeModal} />
          </S.ModalHeader>
          <S.ModalContent>
            <TextBox>
              <p>신고하려는 이유를 알려주세요.</p>
              <p>신고 이유가 타당하지 않으면 반영되지 않을 수 있습니다.</p>
            </TextBox>

            {list.map((item, i) => (
              <RItem
                key={i}
                onClick={() => onSelect(item, i)}
                isSelected={selected.content === item}
              >
                <p>{item}</p>
                <Check />
              </RItem>
            ))}
          </S.ModalContent>
          <ModalFooter>
            <S.Btn color={"#2563eb"} onClick={() => setReport(true)}>
              신고
            </S.Btn>
          </ModalFooter>
        </S.ModalBox>
      </Portal>
      {report && (
        <RedAlert
          text={"리뷰 신고"}
          text1={"리뷰를"}
          text2={" 신고"}
          text3={"하시겠습니까?"}
          setAlert={setReport}
          func={onReport}
          forFunc={null}
        />
      )}
    </>
  );
}

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: baseline;
  & > p {
    color: #acacac;
    font-size: 16px;
  }
`;

const TextBox = styled.div`
  & > p:first-child {
    font-size: 16px;
    color: #f6f6f6;
    font-weight: 700;
    line-height: 28px;
  }
  & > p:nth-child(2) {
    font-size: 14px;
    color: #8b8b8b;
  }
  margin-bottom: 24px;
`;

const RItem = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  cursor: pointer;
  align-items: center;
  & > p {
    color: ${(props) => (props.isSelected ? "#FC6406" : "#E3E3E3")};
  }

  & > svg {
    path {
      fill: ${(props) => (props.isSelected ? "#FC6406" : "#E3E3E3")};
    }
  }
`;
