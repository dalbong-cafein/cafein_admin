import axios from "axios";
import { withAuthInstance } from "./index";

export const marketingListApi = async (page, sort) => {
  return await withAuthInstance.get(`/coupons?page=${page}&sort=${sort}`);
};

export const eventListApi = async (page, sort) => {
  return await withAuthInstance.get(`/boards?boardCategoryId=2`);
};
