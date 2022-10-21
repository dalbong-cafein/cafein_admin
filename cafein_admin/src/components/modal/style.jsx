import styled from "styled-components";

export const ModalBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #131313;
  box-sizing: border-box;
  padding: 40px;
  border: 1px solid #515151;
  border-radius: 16px;
  width: 727px;
  min-height: ${(props) => (props.height ? props.height : "694px")};
`;

export const ModalBigBox = styled(ModalBox)`
  width: ${(props) => (props.double ? "1454px" : "727px")};
  height: 700px;
  padding: 0;
`;
export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  & > p:first-child {
    color: #f6f6f6;
    font-size: 20px;
    font-weight: bold;
  }
  & > svg {
    cursor: pointer;
  }
`;

export const ViewHeader = styled(ModalHeader)`
  & > div:first-child {
    display: flex;
    align-items: baseline;

    & > p:first-child {
      color: #f6f6f6;
      font-size: 20px;
      font-weight: bold;
      margin-right: 24px;
    }
    & > p:nth-child(2) {
      color: #e3e3e3;
      font-size: 16px;
      font-weight: bold;
      margin-right: 16px;
    }
    & > p:nth-child(3) {
      font-size: 16px;
      color: #e3e3e3;
    }
  }
`;
export const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: baseline;
  & > p {
    color: #acacac;
    font-size: 16px;
  }
`;

export const Btn = styled.div`
  color: #fff;
  width: 180px;
  height: 40px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;
export const ModalContent = styled.div`
  color: #fff;
  height: ${(props) => (props.height ? props.height : "520px")};
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

  & > textarea {
    padding: 24px 0;
    width: 90%;

    height: 180px;
    font-size: 16px;
    background-color: #131313;
    color: #e3e3e3;
    border: 0;
    &:focus {
      outline: none;
    }
  }

  & > div {
    width: 100%;
    white-space: pre-line;
    line-height: 22.4px;
    heigth: 200px;
    max-height: 450px;
    color: #e3e3e3;
  }
`;

export const AlertBox = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #333333;
  box-sizing: border-box;
  border: 1px solid #515151;
  border-radius: 8px;
  width: 400px;
  height: 180px;
  padding: 32px 24px 24px;
`;

export const AlertBtn = styled.div`
  color: #fff;
  width: 74px;
  height: 32px;
  background-color: ${(props) => props.color && props.color};
  border-radius: 6px;
  text-align: center;
  line-height: 32px;
  cursor: pointer;
`;
export const AlertContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > p:first-child {
    font-size: 20px;
    font-weight: bold;
  }
  & > span {
    font-size: 14px;
  }
`;

export const Line = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding-bottom: 13px;
  border-bottom: 1px solid ${(props) => (props.color ? props.color : "#333333")};
  & > span {
    width: 100px;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    max-width: 250px;
    word-wrap: break-word;
    line-height: 18px;
    color: #e3e3e3;
  }
  & > p:nth-child(3) {
    color: #fc7521;
  }
  & > p:nth-child(4) {
    color: #acacac;
  }
`;
