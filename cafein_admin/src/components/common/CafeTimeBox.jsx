import { useState } from "react";
import * as S from "../../pages/regSt";
import Row from "../atoms/row";
import ComboBoxForDay from "./ComboBoxForDay";

import { ReactComponent as Plus } from "../../svg/plus.svg";
import { ReactComponent as ArrowDown } from "../../svg/ArrowDown.svg";
import { ReactComponent as ArrowUp } from "../../svg/ArrowUp.svg";

import { convertTime, updateDay } from "../../hooks/registerHook";

export default function CafeTimeBox({
  register,
  setRegister,
  dayarr,
  setDayarr,
  isEdit,
}) {
  const [selectOn, setSelectOn] = useState(false);
  const [days, setDays] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const dayArr = ["월", "화", "수", "목", "금", "토", "일"];
  const dayPush = async (e, item) => {
    e.stopPropagation();
    const copy = [...days];
    if (!days.includes(item)) {
      copy.push(item);
      copy.sort(function (a, b) {
        return dayArr.indexOf(a) - dayArr.indexOf(b);
      });

      setDays(copy);
    } else {
      copy.splice(days.indexOf(item), 1);
      setDays(copy);
    }
  };

  const deleteDay = async (a, i) => {
    const copy2 = { ...register };
    for await (let item of a[2]) {
      updateDay(item, copy2, "", "");
    }
    setRegister(copy2);
    const copy = [...dayarr];
    copy.splice(i, 1);
    setDayarr(copy);
  };

  const addTime = async () => {
    const copy = [...dayarr];
    const copy2 = { ...register };
    const open = await convertTime(openTime);
    const close = await convertTime(closeTime);
    for await (let item of days) {
      updateDay(item, copy2, open, close);
    }
    setRegister(copy2);
    copy.push([open, close, days]);
    setDayarr(copy);
    setOpenTime("");
    setCloseTime("");
    setDays([]);
    setSelectOn(false);
  };

  return (
    <>
      <S.Box height={128}>
        <p>운영시간</p>
        <S.TimeBox>
          <S.BtnRow gap={13}>
            <S.Btn>
              {openTime && <p>{openTime.slice(0, 2) > 12 ? "오후" : "오전"}</p>}
              <input
                placeholder="시작 시간"
                value={openTime}
                onChange={(e) => {
                  setOpenTime(e.target.value);
                }}
              />
            </S.Btn>
            <S.Btn>
              {closeTime && (
                <p>{closeTime.slice(0, 2) > 12 ? "오후" : "오전"}</p>
              )}
              <input
                placeholder="종료 시간"
                value={closeTime}
                onChange={(e) => {
                  setCloseTime(e.target.value);
                }}
              />
            </S.Btn>
            <S.Btn2 isT={selectOn} onClick={() => setSelectOn(!selectOn)}>
              {days.length === 0 ? (
                <Row gap={13} align="center">
                  <p>반복</p> {selectOn ? <ArrowUp /> : <ArrowDown />}
                </Row>
              ) : (
                <p>{days.join(" ")}</p>
              )}
            </S.Btn2>
            {selectOn && (
              <ComboBoxForDay
                dayArr={dayArr}
                dayPush={dayPush}
                isEdit={isEdit}
              />
            )}
            <Plus onClick={addTime} />
          </S.BtnRow>
          {dayarr.map((item, i) => (
            <S.Day key={i}>
              <div>
                {item[0].slice(0, 2) > 12 ? "오후" : "오전"}
                {item[0].slice(0, 2) > 12
                  ? `${String(item[0].slice(0, 2) - 12).padStart(
                      2,
                      "0"
                    )}:${item[0].slice(3)}`
                  : item[0]}
              </div>
              <div>
                {item[1].slice(0, 2) > 12 ? "오후" : "오전"}
                {item[1].slice(0, 2) > 12
                  ? `${String(item[1].slice(0, 2) - 12).padStart(
                      2,
                      "0"
                    )}:${item[1].slice(3)}`
                  : item[1]}
              </div>
              <div>{item[2].length == 1 ? item[2] : item[2].join(",")}</div>
              <p
                onClick={() => {
                  deleteDay(item, i);
                }}
              >
                삭제
              </p>
            </S.Day>
          ))}
        </S.TimeBox>
      </S.Box>
    </>
  );
}
