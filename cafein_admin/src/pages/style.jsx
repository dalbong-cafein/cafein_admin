import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 8px;
  width: 100%;
  border: 1px solid #404040;
`;

export const TableHeader = styled.table`
text-align: center;
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
&>p{
  padding:0;
  margin:0;
  line-height:15px;
}
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
  line-height: 40px;
  position: relative;
  position: relative;
  background-img: ${(props) => props.src};
  & > img {
    position: absolute;
    transform: translate(-50%, 0);
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 9;
  }
`;

export const NonePic = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  color: #000;
  font-size: 10px;
  line-height: 40px;
`;

export const Sbtn = styled.div`
  width: 102px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  background-color: ${(props) => (props.isTrue ? "#2563EB" : "#333333")};
  border-radius: 6px;
  padding: auto 0;
  text-align: center;
  cursor: pointer;
`;
