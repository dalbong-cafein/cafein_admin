import { useState, useRef } from "react";
import SelectHeader from "../components/common/selectHeader";

import Notices from "../components/notices";
import QnA from "../components/QnA";

const Notice = () => {
  const [menu, setMenu] = useState("Notice");

  return (
    <>
      <SelectHeader
        menu={menu}
        setMenu={setMenu}
        menu1={"Notice"}
        menu2={"QnA"}
        Tmenu1={"공지사항"}
        Tmenu2={"자주 묻는 질문"}
      />
      {menu === "Notice" ? <Notices /> : <QnA />}
    </>
  );
};

export default Notice;
