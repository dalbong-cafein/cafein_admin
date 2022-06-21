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
