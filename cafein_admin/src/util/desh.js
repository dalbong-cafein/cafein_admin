import { withAuthInstance } from "./index";

export const adminFeedListApi = async (page, sort, search) => {
  return await withAuthInstance.get(`/boards?page=${page}&sort=${sort}${search && `&keyword=${search}`}`);
};

//오늘 새 데이터 추가
export const deshDataApi = async () => {
  return await withAuthInstance.get("/register-data");
};

export const marketingDListApi = async () => {
  return await withAuthInstance.get(`/coupons/limit`);
};
