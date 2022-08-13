import { withAuthInstance } from "./index";

export const adminFeedListApi = async (page, sort) => {
  return await withAuthInstance.get(`/boards?page=${page}&sort=${sort}`);
};

//오늘 새 데이터 추가
export const deshDataApi = async () => {
  return await withAuthInstance.get("/register-data");
};

export const marketingDListApi = async () => {
  return await withAuthInstance.get(`/coupons/limit`);
};
