import React, { useState } from "react";
import Portal from "./Portal";
import styled from "styled-components";
import { ReactComponent as Header1 } from "../../../svg/header1.svg";
import { ReactComponent as Header2 } from "../../../svg/header2.svg";
import { ReactComponent as Footer } from "../../../svg/footer.svg";
import { ReactComponent as HeaderE } from "../../../svg/headerE.svg";
import { ReactComponent as Arrow } from "../../../svg/ArrowUp.svg";
import Row from "../../atoms/row";
import PVImg from "../PVImg";

export default function NoticeModal({ menu, setModal, item, setAlert }) {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Portal>
      <ModalBox>
        <ModalContent>
          {menu === "Notice" ? (
            <>
              <Header1 />
              <Header2 />
              <TitleBox>
                <p>{item.title}</p>
                <p>{new Date().toLocaleDateString()}</p>
              </TitleBox>
              <ContentBox>
                <div>{item.content}</div>
                {item?.boardImageDtoList && (
                  <div>
                    <PVImg img={item?.boardImageDtoList[0]?.imageUrl} />
                  </div>
                )}
              </ContentBox>
            </>
          ) : (
            <>
              <HeaderE
                style={{
                  borderBottom: "1px solid #efefef",
                  paddingBottom: "16px",
                  backgroundColor: "#fff",
                }}
              />
              <Headers>
                <Row gap={4}>
                  <p
                    style={{
                      color: "#fc6406",
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  >
                    Q
                  </p>
                  <p
                    style={{
                      color: "#333333",
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                  </p>
                </Row>
                <Arrow />
              </Headers>
              <ContentBox2>
                <div>{item.content}</div>
                {item?.imageFile && (
                  <div>
                    <PVImg img={item?.imageFile[0]} />
                  </div>
                )}
              </ContentBox2>
            </>
          )}
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
const Headers = styled.div`
  width: 375px;
  height: 56px;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  & > svg:nth-child(2) {
    width: 11px;
    height: 6.5px;
    path {
      fill: #646464;
    }
  }
`;
const ContentBox = styled.div`
  width: 375px;
  min-height: 500px;
  padding: 20px 16px;
  box-sizing: border-box;
  background-color: #fff;
  & > div:first-child {
    white-space: pre-line;
    font-size: 14px;
    color: #333333;
    min-height: 200px;
    line-height: 20px;
  }
  & > div:nth-child(2) {
    width: 200px;
    min-height: 200px;
    padding: 12px 0;
  }
`;

const ContentBox2 = styled.div`
  width: 375px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 600px;
  & > div:first-child {
    margin: 16px 0 16px 16px;
    padding: 12px;
    width: 328px;
    min-height: 200px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    border-radius: 8px;
    white-space: pre-line;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
  & > div:nth-child(2) {
    width: 200px;
    min-height: 200px;
    padding: 0 16px;
  }
`;
