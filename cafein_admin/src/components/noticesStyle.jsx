import styled from "styled-components";

export const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 52px 102px 48px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: baseline;
  }
`;

export const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 22px;
  ${(props) => props.menustate && "font-weight:bold; border-bottom:2px solid #fff"};
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
  background-color: rgba(51, 51, 51, 0.5);
  padding: 16px 20px;
  border-radius: 16px;
  & > p:first-child {
    font-size: 18px;
    font-weight: 600;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
export const Input = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #333333;
  border-radius: 6px;
  align-items: flex-start;
  gap: 20px;

  box-sizing: border-box;
  padding: 12px;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    & > p {
      width: 50px;
      color: #e3e3e3;
      font-weight: 600;
    }
  }

  & > input {
    font-size: 16px;
    color: #e3e3e3;
    border: 0;
    background-color: #333333;
    width: 100%;
    border-bottom: 1px solid #515151;
    &:focus {
      outline: none;
    }
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
  color: #acacac;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px;
  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 16px;
    & > p {
      color: #e3e3e3;
      font-weight: 600;
    }
    & > textarea {
      width: 90%;
      heigth: 350px;
      background-color: #333333;
      color: #e3e3e3;
      border: 0;
      &:focus {
        outline: none;
      }
    }
  }
`;

export const Btn = styled.div`
  color: #f6f6f6;
  background-color: ${(props) => props.back && props.back};
  width: 180px;
  height: 40px;
  border-radius: 6px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
`;
