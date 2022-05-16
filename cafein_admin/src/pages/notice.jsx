import styled from "styled-components";
import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import Notices from "../components/notices";
import QnA from "../components/QnA";

const Notice = () => {
  const temp = [
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
    {
      code: "1",
      title: "제목입니다",
      content:
        "내용어쩌구저저쩌구 말줄임표를 써야하는데 몇글자에서 끊을지고민중이라 어쩌구 저쩌구우우우우우",
      push: "",
      registration: "03/29/2022",
    },
  ];
  const [menu, setMenu] = useState("Notice");

  return (
    <>
      <Headers>
        <div>
          <Menu menustate={menu === "Notice"} onClick={() => setMenu("Notice")}>
            공지사항
          </Menu>
          <Menu menustate={menu === "QnA"} onClick={() => setMenu("QnA")}>
            자주 묻는 질문
          </Menu>
        </div>
      </Headers>
      {menu === "Notice" ? <Notices /> : <QnA />}
    </>
  );
};

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 72px 102px 48px 0;
  justify-content: space-between;
  & > div:first-child {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;

const Menu = styled.div`
  color: ${(props) => (props.menustate ? "#fff" : "#8B8B8B")};
  font-size: 24px;
  ${(props) =>
    props.menustate && "font-weight:bold; border-bottom:2px solid #fff"};
  padding-bottom: 8px;
`;

export default Notice;
