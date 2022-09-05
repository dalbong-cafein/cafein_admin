import { useState, useRef } from "react";
import SelectHeader from "../components/common/SelectHeader";

import Notices from "../components/notices";
import QnA from "../components/QnA";

const Notice = () => {
  const [menu, setMenu] = useState("Notice");

  return (
    <>
      <SelectHeader
        menu={"notice"}
        menu1={"notice"}
        menu2={"qna"}
        Tmenu1={"공지사항"}
        Tmenu2={"자주 묻는 질문"}
      />

      <Notices menu={menu} />
    </>
  );
};

export default Notice;
