export const convertTime = (time) => {
  time = time.padStart(2, "0");
  if (!time.includes(":")) {
    time += ":00";
  }
  return time;
};

export const updateDay = (j, copy, open = "", close = "") => {
  console.log(open);
  if (j === "월") {
    copy.monOpen = open;
    copy.monClose = close;
  }
  if (j === "화") {
    copy.tueOpen = open;
    copy.tueClose = close;
  }
  if (j === "수") {
    copy.wedOpen = open;
    copy.wedClose = close;
  }
  if (j === "목") {
    copy.thuOpen = open;
    copy.thuClose = close;
  }
  if (j === "금") {
    copy.friOpen = open;
    copy.friClose = close;
  }
  if (j === "토") {
    copy.satOpen = open;
    copy.satClose = close;
  }
  if (j === "일") {
    copy.sunOpen = open;
    copy.sunClose = close;
  }
};
