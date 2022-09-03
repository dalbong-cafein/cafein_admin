import * as S from "../pages/regSt";

import { ReactComponent as CCbad } from "../svg/CCbad.svg";
import { ReactComponent as CCgood } from "../svg/CCgood.svg";
import { ReactComponent as CCsoso } from "../svg/CCsoso.svg";
import { ReactComponent as Cgood } from "../svg/Cgood.svg";
import { ReactComponent as Cbad } from "../svg/Cbad.svg";
import { ReactComponent as Csoso } from "../svg/Csoso.svg";

export default function RegisterCafeRecommendation({ register, setRegister }) {
  const recommendChange = (e) => {
    const copy = { ...register };
    copy.recommendation = e.currentTarget.id;
    setRegister(copy);
  };

  return (
    <S.Box height={176}>
      <p>카공 카페로 추천하시겠어요?</p>
      <S.RowBox>
        <div
          id="BAD"
          onClick={(e) => {
            recommendChange(e);
          }}
        >
          {register.recommendation === "BAD" ? <CCbad /> : <Cbad />}
          <p>별로예요</p>
        </div>
        <div
          id="NORMAL"
          onClick={(e) => {
            recommendChange(e);
          }}
        >
          {register.recommendation === "NORMAL" ? <CCsoso /> : <Csoso />}
          <p>그저 그래요</p>
        </div>
        <div
          id="GOOD"
          onClick={(e) => {
            recommendChange(e);
          }}
        >
          {register.recommendation === "GOOD" ? <CCgood /> : <Cgood />}
          <p>추천해요</p>
        </div>
      </S.RowBox>
    </S.Box>
  );
}
