import { withAuthInstance } from "./index";

export const userListApi = async (sort, page) => {
  return await withAuthInstance.get(`/members?page=${page}&sort=${sort}`);
};
export const userSearchApi = async (sub, keyword, sort, page) => {
  return await withAuthInstance.get(
    `/members?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
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
