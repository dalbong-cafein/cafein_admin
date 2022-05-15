import styled from "styled-components";

export const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 102px 48px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: baseline;
  }
`;

export const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 24px;
  ${(props) =>
    props.menustate && "font-weight:bold; border-bottom:2px solid #fff"};
  padding-bottom: 8px;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 56px;
  & > div {
    flex: 1;
  }
`;

export const NewNotice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  width: 100%;
  box-sizing: border-box;
  & > p:first-child {
    font-size: 18px;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
export const Input = styled.input`
  width: 100%;
  height: 48px;
  background-color: #333333;
  color: #8b8b8b;
  border-radius: 6px;
  border: 0;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  padding: 12px;
  &:focus {
    outline: none;
  }
`;

export const PhotoBox = styled.div`
  display: flex;
  gap: 12px;
`;

export const FileUpload = styled.div`
  width: 80px;
  height: 80px;
  background: #c4c4c4;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 9.5px;
  cursor: pointer;
  & > div {
    color: #646464;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  display: inline-block;
  border-radius: 6px;
  & > svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(50px, 5px);
  }
`;

export const TextBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #333333;
  color: #8b8b8b;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px;
  & > textarea {
    width: 90%;
    heigth: 80%;
    background-color: #333333;
    border: 0;
  }
`;

export const CheckPush = styled.div`
  display: flex;
  gap: 15px;
`;

export const Btn = styled.div`
  color: #f6f6f6;
  background-color: ${(props) => props.back && props.back};
  width: 180px;
  height: 40px;
  border-radius: 6px;
  line-height: 40px;
  text-align: center;
`;
