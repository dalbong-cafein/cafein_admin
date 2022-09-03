import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: ${(props) => (props.isNull ? "8px 8px 0 0" : "8px")};
  width: 100%;
  height: 90%;
  border: 1px solid #404040;
`;

export const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65vh;
`;

export const FitBox = styled.div`
  width: fit-content;
  height: fit-content;
`;

export const Input = styled.input`
  border: 0;
  background-color: #131313;
  color: #fff;
  width: 220px;
  height: 32px;
  &:focus {
    outline: none;
  }
`;

export const Photo = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
`;

export const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
`;

export const Sbtn = styled.div`
  position: relative;
  min-width: 120px;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  background-color: ${(props) => props.color || "#333333"};
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  & > svg {
    width: 13px;
    height: 10px;
    path {
      fill: #fff;
    }
  }
`;

export const Btn = styled.button`
  margin: 0 auto;
  background-color: ${(props) => (props.content ? "#26BA6A" : "#f44336")};
  width: 96px;
  height: 28px;
  text-align: center;
  opacity: 0.3;

  border-radius: 6px;
  color: #fff;
  line-height: 26px;
  cursor: pointer;
`;
