import SelectHeader from "../components/common/selectHeader";
import Event from "../components/event";

const Events = () => {
  return (
    <>
      <SelectHeader
        menu={"event"}
        menu1={"marketing"}
        menu2={"event"}
        Tmenu1={"마케팅 서비스"}
        Tmenu2={"이벤트"}
      />
      <Event />
    </>
  );
};

export default Events;
