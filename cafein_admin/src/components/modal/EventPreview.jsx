import React from "react";
import Portal from "./Portal";
import styled from "styled-components";
import { ReactComponent as Header } from "../../svg/BHeader.svg";
import { ReactComponent as Footer } from "../../svg/footer.svg";

import PVImg from "../common/PVImg";

export default function EventPreview({ setModal, item }) {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <Portal setModal={setModal}>
      <ModalBox>
        <ModalContent style={{ backgroundColor: "#fff" }}>
          <Header />
          <ContentBox>
            {item && (
              <div>
                <PVImg img={item} />
              </div>
            )}
          </ContentBox>
          <Footer />
        </ModalContent>
        <ModalFooter>
          <Btn color="#515151" onClick={closeModal}>
            닫기
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
  background-color: #131313;
  box-sizing: border-box;
  border: 1px solid #515151;
  max-height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: baseline;
  padding: 20px 0;
`;

const Btn = styled.div`
  color: #fff;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;
const ModalContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentBox = styled.div`
  width: 375px;
  padding: 30px 16px;
  box-sizing: border-box;
  background-color: #fff;
  & > div {
    width: 343px;
    height: 72px;
  }
`;
