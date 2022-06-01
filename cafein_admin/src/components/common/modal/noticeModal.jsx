import React, { useState } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../svg/close2.svg";
import { ReactComponent as Header1 } from "../../../svg/header1.svg";
import { ReactComponent as Header2 } from "../../../svg/header2.svg";
import { ReactComponent as Footer } from "../../../svg/footer.svg";
import Row from "../../atoms/row";
import PVImg from "../PVImg";
import RedAlert from "./redAlert";

export default function NoticeModal({ setModal, item, setAlert }) {
  const closeModal = () => {
    setModal(false);
  };

  console.log(item);
  return (
    <Portal>
      <ModalBox>
        <ModalContent>
          <Header1 />
          <Header2 />
          <TitleBox>
            <p>{item.title}</p>
            <p>{item.regDateTime}</p>
          </TitleBox>
          <ContentBox>
            <p>{item.content}</p>
            {item.imagefile && (
              <div>
                <PVImg img={item.imagefile[0]} />
              </div>
            )}
          </ContentBox>
          <Footer />
        </ModalContent>
        <ModalFooter>
          <Btn color={"#515151"} onClick={closeModal}>
            닫기
          </Btn>
          <Btn color={"#2563EB"} onClick={() => setAlert(true)}>
            삭제
          </Btn>
        </ModalFooter>
      </ModalBox>
    </Portal>
  );
}

const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #333333;
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid #515151;
  // width: 727px;
  // height: 694px;
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: baseline;
  padding: 20px 0;
`;

const Btn = styled.div`
  color: #fff;
  width: 88px;
  height: 36px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
`;
const ModalContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
`;
const TitleBox = styled.div`
  width: 375px;
  height: 86px;
  padding: 20px 16px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  & > p:first-child {
    font-size: 16px;
    color: #333333;
    line-height: 30px;
  }
  & > p:nth-child(2) {
    font-size: 13px;
    color: #acacac;
    line-height: 13px;
  }
`;
const ContentBox = styled.div`
  width: 375px;
  min-height: 300px;
  padding: 20px 16px;
  box-sizing: border-box;
  background-color: #fff;
  & > p {
    white-space: pre-line;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
  & > div {
    width: 200px;
    height: 200px;
    padding: 12px 0;
  }
`;
