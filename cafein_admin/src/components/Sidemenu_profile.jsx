import React from "react";
import styled from "styled-components";

import Row from "./atoms/row";

import { ReactComponent as Exit } from "../svg/exit.svg";
import { ReactComponent as NonePic } from "../svg/nonePic.svg";

import { useRecoilState } from "recoil";
import { adminState } from "../recoil/admin";

export default function SidemenuProfile() {
  const [admin] = useRecoilState(adminState);

  const onClickExit = () => {
    window.location.replace("/");
    localStorage.clear();
  };
  return (
    <Row align="center" gap={60}>
      <Row gap={12}>
        {admin.image ? <Pic img={admin.image} /> : <NonePic />}

        <Column>
          <p>카페인</p>
          <p>관리자</p>
        </Column>
      </Row>
      <Exit
        style={{
          cursor: "pointer",
        }}
        onClick={onClickExit}
      />
    </Row>
  );
}

const Pic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ img }) =>
    img &&
    `url(${img}) no-repeat center
  center/contain`};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > p:first-child {
    font-size: 16px;
    font-weigth: bold;
    color: #fff;
  }
  & > p:last-child {
    font-size: 14px;
    color: #acacac;
  }
`;
