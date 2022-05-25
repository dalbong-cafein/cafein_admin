import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  border: 1px solid #404040;
`;

export const TableHeader = styled.table`
font-size: 14px;

color: #e3e3e3;
width: 100%;
table-layout : auto ;
word-break : break-all ;

border-spacing: 0;
border-collapse: collapse;
border-style: hidden;

& > th,
td {
  padding: 16px;
  border: 1px solid #404040;

}

& > tr:first-child {
  color: #8b8b8b;
  max-heightL 72px;

}
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
  background: ${({ img }) => img && `url(${img})`} no-repeat center
    center/contain;
`;

export const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #000;
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Sbtn = styled.div`
  min-width: 102px;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  background-color: ${(props) => props.color || "#333333"};
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  & > svg {
    width: 12px;
    height: 7px;
    path {
      fill: #fff;
    }
  }
`;
