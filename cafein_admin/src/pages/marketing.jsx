import { useState } from "react";

import SelectHeader from "../components/common/selectHeader";
import Event from "../components/event";
import Marketings from "../components/marketings";

const Marketing = () => {
  return (
    <>
      <SelectHeader
        menu={"marketing"}
        menu1={"marketing"}
        menu2={"event"}
        Tmenu1={"마케팅 서비스"}
        Tmenu2={"이벤트"}
      />
      <Marketings />
    </>
  );
};

export default Marketing;
