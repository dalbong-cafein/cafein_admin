import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: ${(props) => (props.isNull ? "8px 8px 0 0" : "8px")};
  width: 100%;
  border: 1px solid #404040;
`;

export const TableHeader = styled.table`
  font-size: 14px;

  color: #e3e3e3;
  width: 100%;
  table-layout: auto;
  word-break: break-all;

  border-spacing: 0;
  border-collapse: collapse;
  border-style: hidden;

  & > th,
  td {
    padding: 12px;
    border: 1px solid #404040;
    box-sizing: border-box;
  }
  & > td {
    height: 72px;
    position: relative;
  }

  & > tr:first-child {
    color: #8b8b8b;
  }
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
