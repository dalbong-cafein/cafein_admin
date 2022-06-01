import styled from "styled-components";
import Row from "../components/atoms/row";

import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { adminState } from "../recoil/admin";
import { useState } from "react";
const Admin = () => {
  const [admin] = useRecoilState(adminState);
  const [editMode, setEditMode] = useState(false);
  return (
    <Container>
      <div>
        <Row gap={24} align={"center"}>
          <Pic img={admin.image} />
          <Column>
            <Row gap={16} align={"baseline"}>
              <Txt bold={true} color={"#f6f6f6"} size={24}>
                카페인
              </Txt>
              <Txt color={"#8b8b8b"} size={16}>
                관리자
              </Txt>
            </Row>
            <Txt color={"#8b8b8b"} size={16}>
              070-000-000
            </Txt>
          </Column>
        </Row>
      </div>
      <Box>
        <Txt bold={true} color={"#f6f6f6"} size={16}>
          상세 정보
        </Txt>
        <Line>
          <span>출시</span>
          <p>+00일</p>
        </Line>
        <Line>
          <span>회원 수</span>
          <p>000명</p>
        </Line>
        <Line>
          <span>사이트</span>

          <a href="http://cafeinoffical.notion.site/Cafein" target="blank">
            http://cafeinoffical.notion.site/Cafein
          </a>
        </Line>
        <Line>
          <span>이메일</span>
          <p>{admin.email}</p>
        </Line>
      </Box>
      {editMode ? (
        <BtnBox>
          <div
            style={{ backgroundColor: "#515151" }}
            onClick={() => setEditMode(!editMode)}
          >
            취소
          </div>
          <div>저장</div>
        </BtnBox>
      ) : (
        <BtnBox>
          <div onClick={() => setEditMode(!editMode)}>수정</div>
        </BtnBox>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
const Box = styled.div`
  width: 871px;
  height: 310px;
  border: 1px solid #515151;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Pic = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ img }) => img && `url(${img})`} no-repeat center
    center/contain;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Txt = styled.div`
  ${(props) => props.bold && "font-weight:bold"};
  color: ${(props) => props.color && props.color};
  font-size: ${(props) => props.size && props.size}px;
`;

const Line = styled.div`
  display: flex;
  gap: 16px;
  & > span {
    width: 60px;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
    color: #8b8b8b;
  }
  & > p:nth-child(2) {
    font-size: 14px;
    color: #e3e3e3;
  }
  & > a {
    font-size: 14px;
    color: #e3e3e3;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  width: 871px;
  gap: 20px;
  & > div {
    padding: 12px 75px;
    border-radius: 6px;
    background-color: #2563eb;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
`;
export default Admin;