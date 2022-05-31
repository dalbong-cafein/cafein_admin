import { useState } from "react";

import SelectHeader from "../components/common/selectHeader";
import Event from "../components/event";
import Marketings from "../components/marketings";

const Marketing = () => {
  const [menu, setMenu] = useState("Marketing");

  return (
    <>
      <SelectHeader
        menu={menu}
        setMenu={setMenu}
        menu1={"Marketing"}
        menu2={"Event"}
        Tmenu1={"마케팅 서비스"}
        Tmenu2={"이벤트"}
      />
      {menu === "Marketing" ? <Marketings /> : <Event />}
    </>
  );
};

export default Marketing;
