import { withAuthInstance } from "./index";

export const userListApi = async (sort, page) => {
  return await withAuthInstance.get(`/members?page=${page}&sort=${sort}`);
};
export const userSearchApi = async (searchType, keyword, sort, page, selectedState) => {
  const sub =
    searchType == "분류"
      ? "m"
      : searchType == "회원명"
      ? "mn"
      : searchType == "핸드폰"
      ? "p"
      : ["p", "m", "mn"];
  const memberStates = [];
  const enArr = { 기본: "NORMAL", 신고: "SUSPENSION", 탈퇴: "LEAVE" };
  selectedState.forEach((item) => {
    if (enArr[item]) {
      memberStates.push(enArr[item]);
    }
  });
  if (memberStates.length) {
    return await withAuthInstance.get(
      `/members?page=${page}&sort=${sort}&memberStates=${memberStates}&searchType=${sub}&keyword=${keyword}`
    );
  } else {
    return await withAuthInstance.get(
      `/members?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
    );
  }
};
export const userReportApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}/reports`);
};
export const userDetailApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}`);
};

export const stickerApi = async (id) => {
  return await withAuthInstance.get(`/stickers?memberId=${id}`);
};

export const stickerDelApi = async (id) => {
  return await withAuthInstance.delete(`/stickers/${id}`);
};

//회원 탈퇴
export const userLeaveApi = async (id) => {
  return await withAuthInstance.delete(`/members/${id}`);
};

//회원정보 수정
export const userDataUpdateApi = async (data) => {
  return await withAuthInstance.put(`/members`, data);
};

//회원 하트 리스트 조회
export const userHeartListApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}/hearts`);
};
