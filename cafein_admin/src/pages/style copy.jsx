import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: ${(props) => (props.isNull ? "8px 8px 0 0" : "8px")};
  width: 100%;
  // height: 90%;
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
  width: 250px;
  height: 32px;
  &:focus {
    outline: none;
  }
`;

export const Photo = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ img }) => img && `url(${img})`} no-repeat center center/cover;
  border-radius: 4px;
`;

export const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Sbtn = styled.div`
  position: relative;
  min-width: 110px;
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

export const ResetBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  color: #fff;
  background-color: #fc7521;
  border-radius: 6px;
  cursor: pointer;
`;

export const CongestionBtn = styled.div`
  padding: 5px;
  background-color: ${(props) =>
    props.id == 1 ? "#DFF5E8" : props.id == 2 ? "#FFF3E0" : "#FFEBEE"};
  color: ${(props) => (props.id == 1 ? "#26BA6A" : props.id == 2 ? "#FF9800" : "#F44336")};
  border-radius: 4px;
`;
