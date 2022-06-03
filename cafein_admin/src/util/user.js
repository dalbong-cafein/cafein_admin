import { withAuthInstance } from "./index";

export const userListApi = async (sort, page) => {
  return await withAuthInstance.get(`/members?sort=${sort}`);
};
export const userSearchApi = async (sub, keyword) => {
  return await withAuthInstance.get(
    `/members?searchType=${sub}&keyword=${keyword}`
  );
};
export const userReportApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}/reports`);
};
export const userDetailApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}`);
};
